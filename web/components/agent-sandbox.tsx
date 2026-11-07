"use client";

import { useState } from "react";
import { Play, RotateCcw, CheckCircle2, Cpu, ShieldCheck, Database, Wrench } from "lucide-react";

const SCENARIOS = [
  {
    id: "ecommerce",
    title: "E-Commerce Multi-Agent Ops",
    trigger: "Catalog Delta Event: 120 listings flagged with stale pricing & missing SEO metadata",
    steps: [
      {
        id: "supervisor",
        label: "Supervisor Orchestrator",
        role: "LangGraph State Router",
        icon: Cpu,
        state: "idle",
        output: "Assessed inventory event. Splitting workload: Catalog Agent (metadata extraction) + Pricing Agent (demand elasticity lookup)."
      },
      {
        id: "specialists",
        label: "Parallel Specialists",
        role: "Sub-Agent Execution",
        icon: Wrench,
        state: "idle",
        output: "SEO Copywriter drafted 120 descriptions. Pricing Engine retrieved competitor API indices via MCP."
      },
      {
        id: "validation",
        label: "Guardrails & Verification",
        role: "Safety Checkpoint",
        icon: ShieldCheck,
        state: "idle",
        output: "Gross margin constraints verified (>22% buffer). Schema validated against storefront API contracts."
      },
      {
        id: "commit",
        label: "State Commit & Output",
        role: "FastAPI / Database Commit",
        icon: Database,
        state: "idle",
        output: "Committed 120 catalog mutations with full audit trail in 420ms. Telemetry logged."
      }
    ]
  },
  {
    id: "research",
    title: "Autonomous Research & Self-Correction",
    trigger: "Research Question: Validate algorithmic complexity bounds for cyclic graph state machines",
    steps: [
      {
        id: "supervisor",
        label: "Hypothesis Generator",
        role: "Document Ingestion & RAG",
        icon: Cpu,
        state: "idle",
        output: "Parsed academic paper. Formulated hypothesis: O(V + E) traversal with cyclic checkpointing."
      },
      {
        id: "specialists",
        label: "Sandbox Experiment Runner",
        role: "Python Sandbox Worker",
        icon: Wrench,
        state: "idle",
        output: "Synthesized synthetic graph benchmark in Python sandbox. First run timed out at N=50,000."
      },
      {
        id: "validation",
        label: "Autonomous Reflection Loop",
        role: "Self-Correction Edge",
        icon: ShieldCheck,
        state: "idle",
        output: "Analyzed stack trace: detected quadratic recursion. Self-corrected to iterative memoized queue."
      },
      {
        id: "commit",
        label: "Structured Synthesis",
        role: "Report Generation",
        icon: Database,
        state: "idle",
        output: "Benchmark passed with O(V+E) verified across 100k nodes. Generated executive summary."
      }
    ]
  }
];

export function AgentSandbox() {
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const scenario = SCENARIOS[selectedScenario];

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);

    for (let i = 0; i < scenario.steps.length; i++) {
      setActiveStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    setActiveStepIndex(scenario.steps.length);
    setIsRunning(false);
  };

  const resetSimulation = () => {
    setActiveStepIndex(-1);
    setIsRunning(false);
  };

  return (
    <section id="sandbox" className="py-20 md:py-28 border-t border-surface-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>Signature Interaction / Live System Sandbox</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Agent Architecture Sandbox
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-lg font-sans">
              Interact with a live simulation of Saif&apos;s supervisor multi-agent state machines, 
              demonstrating autonomous task delegation, error recovery, and tool execution via MCP.
            </p>
          </div>
        </div>

        {/* Sandbox Container */}
        <div className="rounded-2xl border-2 border-surface-border bg-surface p-6 sm:p-8 shadow-soft-lg space-y-8">
          
          {/* Top Controls: Scenario Switcher & Run Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                Scenario:
              </span>
              <div className="flex rounded-lg border border-surface-border p-1 bg-surface-muted">
                {SCENARIOS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setSelectedScenario(idx);
                      resetSimulation();
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      selectedScenario === idx
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={runSimulation}
                disabled={isRunning}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isRunning
                    ? "bg-accent/50 text-white cursor-not-allowed"
                    : "bg-accent text-accent-foreground hover:bg-accent-hover shadow-accent-sm"
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
                <span>{isRunning ? "Simulating Workflow..." : "Trigger Agent Graph"}</span>
              </button>

              <button
                type="button"
                onClick={resetSimulation}
                disabled={isRunning || activeStepIndex === -1}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-surface-border bg-surface text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                title="Reset simulation state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Trigger Banner */}
          <div className="p-3.5 rounded-xl bg-surface-muted border border-surface-border/80 flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-bold uppercase text-[10px]">
              Ingestion Event
            </span>
            <span className="text-foreground truncate">{scenario.trigger}</span>
          </div>

          {/* Visual Step Pipeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenario.steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStepIndex === idx;
              const isDone = activeStepIndex > idx;

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all duration-300 relative ${
                    isCurrent
                      ? "border-accent bg-accent-subtle shadow-md scale-[1.02]"
                      : isDone
                      ? "border-accent/40 bg-surface shadow-soft-sm"
                      : "border-surface-border bg-surface-muted/60 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isCurrent
                          ? "bg-accent text-accent-foreground"
                          : isDone
                          ? "bg-accent/20 text-accent"
                          : "bg-surface-border text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface border border-surface-border text-muted-foreground">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="text-xs font-mono uppercase text-muted-foreground">
                      {step.role}
                    </div>
                    <div className="font-display font-bold text-sm text-foreground">
                      {step.label}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-accent font-semibold animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        Executing...
                      </span>
                    ) : isDone ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Pending State</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Real-time State & Output Console */}
          <div className="rounded-xl border border-surface-border bg-black/95 text-emerald-400 p-4 font-mono text-xs space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LangGraph State Telemetry Stream
              </span>
              <span>FastAPI Gateway: 200 OK</span>
            </div>

            <div className="min-h-[80px] flex flex-col justify-center space-y-1 text-gray-200">
              {activeStepIndex === -1 ? (
                <div className="text-gray-500 italic">
                  &gt; Click &apos;Trigger Agent Graph&apos; above to observe real-time node state transitions...
                </div>
              ) : activeStepIndex >= scenario.steps.length ? (
                <div className="space-y-1 text-emerald-400">
                  <div>&gt; Workflow complete. All state conditions satisfied.</div>
                  <div className="text-gray-300">
                    &gt; Final Output: {scenario.steps[scenario.steps.length - 1].output}
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-accent font-semibold">
                    &gt; [NODE: {scenario.steps[activeStepIndex].id.toUpperCase()}] Active State:
                  </div>
                  <div className="text-white">
                    {scenario.steps[activeStepIndex].output}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
