import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from '../Common/GlassCard';
import { StatusBadge } from '../Common/StatusBadge';
import { useGridStore } from '../../store/gridStore';
import {
  Sparkles,
  Send,
  Trash2,
  Cpu,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers
} from 'lucide-react';
import { MOCK_TRANSFORMERS } from '../../services/mockData';

export const CopilotChat: React.FC = () => {
  const {
    copilotMessages,
    isCopilotThinking,
    sendCopilotMessage,
    clearCopilotMessages,
    openAssetDrawer
  } = useGridStore();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Predict tomorrow evening peak demand',
    'Which transformers need immediate attention?',
    'Show feeders with abnormal or overloaded power factor',
    'What happens if temperature increases by +5°C?',
    'Summarize active outages and affected consumers'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isCopilotThinking) return;
    sendCopilotMessage(query);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [copilotMessages, isCopilotThinking]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[850px] glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
      {/* Copilot Header */}
      <div className="p-4 px-6 border-b border-white/10 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">GridSense Copilot</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                AUTONOMOUS AI
              </span>
            </div>
            <p className="text-xs text-slate-400">Context-aware telemetry reasoning & predictive operational assistant</p>
          </div>
        </div>

        <button
          onClick={clearCopilotMessages}
          className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5"
          title="Clear Context"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="p-3 px-6 bg-slate-900/30 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase shrink-0">SUGGESTED:</span>
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-white/5 text-slate-300 shrink-0 transition-all font-sans text-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {copilotMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                }`}
              >
                {isUser ? 'ME' : '⚡'}
              </div>

              {/* Message Bubble */}
              <div className="space-y-3 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
                      : 'glass-panel bg-slate-900/70 border border-white/10 text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Structured Metrics Cards (if returned by Copilot) */}
                {msg.metrics && msg.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {msg.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs"
                      >
                        <div className="text-[10px] text-slate-400 font-mono uppercase">{m.label}</div>
                        <div className="font-bold text-white font-mono mt-0.5">{m.value}</div>
                        {m.delta && <div className="text-[10px] text-cyan-400 font-mono">{m.delta}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Affected Assets Card list */}
                {msg.affectedAssets && msg.affectedAssets.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      Identified Priority Assets
                    </div>
                    <div className="space-y-1.5">
                      {msg.affectedAssets.map((asset) => (
                        <div
                          key={asset.id}
                          onClick={() => {
                            const found = MOCK_TRANSFORMERS.find((t) => t.id === asset.id);
                            if (found) openAssetDrawer(found);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 cursor-pointer border border-white/5 transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="font-semibold text-white">{asset.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-rose-400">
                              {asset.risk}% Risk
                            </span>
                            <StatusBadge status={asset.status} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommended Actions */}
                {msg.recommendedActions && msg.recommendedActions.length > 0 && (
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Recommended Operational Protocol</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-200 list-disc list-inside">
                      {msg.recommendedActions.map((rec, rIdx) => (
                        <li key={rIdx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footnote data source */}
                {msg.dataSource && (
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Info className="w-3 h-3 text-cyan-400" />
                    <span>Verified via {msg.dataSource} (Confidence: {msg.confidencePct}%)</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isCopilotThinking && (
          <div className="flex gap-3 max-w-lg items-center">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs font-bold animate-pulse">
              ⚡
            </div>
            <div className="p-3.5 rounded-2xl glass-panel bg-slate-900/80 border border-cyan-500/30 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono text-cyan-300">
                Querying grid topology & running ML inference...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-white/10 bg-slate-900/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot anything about grid telemetry, risk, forecasts, or simulated scenarios..."
            disabled={isCopilotThinking}
            className="flex-1 glass-input px-4 py-3 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isCopilotThinking}
            className="p-3 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
