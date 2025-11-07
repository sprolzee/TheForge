'use client';

import { useChat } from '@ai-sdk/react';
import { CopyIcon, MessageSquare } from 'lucide-react';
import { Fragment, useState, useEffect, useRef } from 'react';
import { Action, Actions } from '@/components/ai-elements/actions';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import { ModelResults } from '@/components/ai-elements/3d-model-results';
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@/components/ai-elements/tool';

const models = [
  {
    name: 'GPT 4o',
    value: 'gpt-4o',
  },
  {
    name: 'GPT 5',
    value: 'gpt-5',
  },
];

const suggestions = [
  'I need a 3D printable phone stand',
  'Find me articulated dragon models',
  'I want to print functional organizers for my desk',
  'Show me something cool and unique',
  'What are popular prints right now?',
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>(models[0].value);
  const { messages, sendMessage, status } = useChat();
  const processedToolCalls = useRef<Set<string>>(new Set());

  // Auto-trigger AI response after tool execution
  useEffect(() => {
    if (status !== 'ready' || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'assistant') return;

    // Find tool parts that have completed
    lastMessage.parts.forEach((part: any, idx: number) => {
      if (
        part.type === 'tool-search_3d_models' &&
        part.state === 'output-available' &&
        'output' in part
      ) {
        const toolId = `${lastMessage.id}-${idx}`;
        
        // Check if we've already processed this tool call
        if (processedToolCalls.current.has(toolId)) return;
        
        // Check if there's already text after this tool
        const hasTextAfter = lastMessage.parts.slice(idx + 1).some(
          (p: any) => p.type === 'text' && p.text?.trim()
        );
        
        if (hasTextAfter) return;

        // Mark as processed and trigger AI summary
        processedToolCalls.current.add(toolId);

        const results = part.output.results || [];
        const rawSourceCount = (part.output.sourceCount ?? {}) as Record<string, unknown>;
        const sourceEntries = Object.entries(rawSourceCount).filter(
          (entry): entry is [string, number] => typeof entry[1] === 'number' && entry[1] > 0
        );
        const sourceSummary = sourceEntries
          .map(([source, count]) => `${count} from ${source}`)
          .join(', ');

        setTimeout(() => {
          sendMessage(
            {
              text: `I found ${results.length} total models (${sourceSummary}). Please provide a friendly summary highlighting the variety of models found across the different platforms. Mention that users can click on any model card above to view it on the original site.`,
            },
            {
              body: { model },
            }
          );
        }, 300);
      }
    });
  }, [messages, status, sendMessage, model]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            model: model,
          },
        }
      );
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(
      { text: suggestion },
      {
        body: {
          model: model,
        },
      }
    );
  };

  return (
    <div className="mx-auto flex h-full max-w-4xl flex-col p-6">
      <div className="flex h-full min-h-0 flex-col">
        <Conversation className="relative min-h-0 w-full flex-1 overflow-hidden">
          <ConversationContent>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="No messages yet"
                description="Start a conversation to see messages here"
              />
            ) : (
              messages.map(message => (
                <div key={message.id}>
                  {message.role === 'assistant' &&
                    message.parts.filter(part => part.type === 'source-url')
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              part => part.type === 'source-url'
                            ).length
                          }
                        />
                        {message.parts
                          .filter(part => part.type === 'source-url')
                          .map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}
                  {message.parts.map((part, i) => {
                    // Handle tool calls
                    if (part.type.startsWith('tool-') && 'state' in part) {
                      const toolPart = part as any; // Type assertion for tool parts
                      const hasOutput = toolPart.state === 'output-available' && 'output' in toolPart;
                      const isSearchTool = toolPart.type === 'tool-search_3d_models';
                      
                      return (
                        <div key={`${message.id}-${i}`} className="my-4">
                          <Tool defaultOpen={toolPart.state === 'output-available'}>
                            <ToolHeader
                              type={toolPart.type}
                              state={toolPart.state}
                            />
                            <ToolContent>
                              <ToolInput input={toolPart.input} />
                              {isSearchTool && hasOutput && 'output' in toolPart ? (
                                <div className="p-4">
                                  <ModelResults results={toolPart.output} />
                                </div>
                              ) : hasOutput && 'output' in toolPart ? (
                                <ToolOutput 
                                  output={
                                    toolPart.output && typeof toolPart.output === 'object'
                                      ? JSON.stringify(toolPart.output, null, 2)
                                      : toolPart.output
                                  }
                                  errorText={'errorText' in toolPart ? toolPart.errorText : undefined}
                                />
                              ) : null}
                            </ToolContent>
                          </Tool>
                        </div>
                      );
                    }

                    switch (part.type) {
                      case 'text':
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              </MessageContent>
                            </Message>
                            {message.role === 'assistant' &&
                              i === messages.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                          </Fragment>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={
                              status === 'streaming' &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))
            )}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <Suggestions>
          {suggestions.map(suggestion => (
            <Suggestion
              key={suggestion}
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          ))}
        </Suggestions>

        <PromptInput onSubmit={handleSubmit} className="mt-4 flex-shrink-0">
          <PromptInputTextarea
            onChange={e => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputModelSelect
                onValueChange={value => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map(model => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
