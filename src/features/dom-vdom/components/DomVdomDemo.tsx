'use client';

// DomVdomDemo visualizes a user click, old VDOM, new VDOM, diff steps, and real DOM updates.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TreeVisualizer } from '@/features/dom-vdom/components/TreeVisualizer';
import { DiffStepper } from '@/features/dom-vdom/components/DiffStepper';
import { FrameworkCard } from '@/features/dom-vdom/components/FrameworkCard';
import { diff, VNode } from '@/features/dom-vdom/utils/vdomDiff';
import { NextTopic } from '@/features/shared/components/NextTopic';
import { Cpu, Zap, Layers, Check } from 'lucide-react';

// Simple VDOM representation of a button with a counter
function createVDOM(count: number): VNode {
  return {
    type: 'div',
    props: { className: 'p-4 rounded-xl bg-zinc-900/30 border border-zinc-800' },
    children: [
      {
        type: 'button',
        props: {
          onClick: 'increment', // placeholder for demo purposes
          className: 'px-4 py-2 bg-purple-600 text-white rounded',
        },
        children: [{ type: 'text', props: { nodeValue: `Count: ${count}` } }],
      },
    ],
  };
}

export function DomVdomDemo() {
  const [count, setCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Old and new VDOM trees
  const oldVDOM = createVDOM(count);
  const newVDOM = createVDOM(count + 1);
  const patches = diff(oldVDOM, newVDOM);

  const handleClick = () => {
    setCount((c) => c + 1);
    setActiveStep(0);
    // advance steps with a small delay for animation
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((s, i) => {
      setTimeout(() => setActiveStep(s), i * 800);
    });
  };

  return (
    <div className="space-y-12">
      <section id="dom-vdom" className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-5xl font-black text-white tracking-widest uppercase italic">
            DOM vs Virtual‑DOM
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            See how a user interaction creates a new VDOM, how React diffs it, and how the real DOM updates.
          </p>
        </div>

        {/* Interaction button */}
        <div className="flex justify-center">
          <button
            onClick={handleClick}
            className={cn('px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition')}
          >
            Increment Counter (Current: {count})
          </button>
        </div>

        {/* Stepper */}
        <DiffStepper activeStep={activeStep} />

        {/* VDOM visualizers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            key={`old-${count}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">Old VDOM</h3>
            <TreeVisualizer root={oldVDOM} />
          </motion.div>
          <motion.div
            key={`new-${count}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-lg font-semibold text-zinc-300 mb-2">New VDOM</h3>
            <TreeVisualizer root={newVDOM} />
          </motion.div>
        </div>

        {/* Patches list */}
        <div className="mt-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 overflow-auto max-h-48">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Patches (diff result)</h4>
          <pre className="text-xs text-green-400 whitespace-pre-wrap">
{JSON.stringify(patches, null, 2)}
          </pre>
        </div>

        {/* Real DOM preview */}
        <div className="mt-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Real DOM after update</h4>
          <pre className="text-xs text-blue-400 whitespace-pre-wrap">
{`<div class="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800">
  <button class="px-4 py-2 bg-purple-600 text-white rounded">Count: ${count + 1}</button>
</div>`}
          </pre>
        </div>
      </section>

      {/* Framework comparison cards */}
      <section id="framework-comparison" className="space-y-6">
        <h3 className="text-3xl font-black text-white text-center">Why Some Frameworks Skip VDOM</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FrameworkCard
            name="React / Next.js"
            description="Uses a VDOM to batch updates and minimise DOM writes."
            icon={Cpu}
            color="text-purple-400"
            bg="bg-purple-500/10"
          />
          <FrameworkCard
            name="Solid"
            description="Compiles fine‑grained reactive primitives directly to DOM updates, no VDOM."
            icon={Zap}
            color="text-teal-400"
            bg="bg-teal-500/10"
          />
          <FrameworkCard
            name="Svelte"
            description="Compile‑time analysis generates optimal DOM patches, eliminating runtime VDOM."
            icon={Layers}
            color="text-green-400"
            bg="bg-green-500/10"
          />
          <FrameworkCard
            name="Qwik"
            description="Resumable architecture streams only the needed parts, avoiding a central VDOM."
            icon={Check}
            color="text-orange-400"
            bg="bg-orange-500/10"
          />
        </div>
      </section>

      {/* Theoretical Deep Dive */}
      <section id="theoretical-deep-dive" className="max-w-4xl mx-auto space-y-12">
        <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black text-white px-2 border-l-4 border-blue-600">The VDOM Philosophy</h3>
            
            <div className="grid grid-cols-1 gap-8 text-zinc-400">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter">Why does React still use it?</h4>
                <p className="leading-relaxed">
                  React was built on the idea of <strong>Pure Functions</strong>. By treating the UI as a function 
                  of state, the VDOM allows React to compute a &quot;target state&quot; without caring about the 
                  current state of the browser. This abstraction also makes <strong>React Native</strong> possible—the 
                  same VDOM logic can patch iOS/Android native views instead of browser DOM nodes.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter">If there is no VDOM, how does the browser work?</h4>
                <p className="leading-relaxed">
                  The browser <strong>always</strong> has a Real DOM. Frameworks like <strong>Svelte</strong> and 
                  <strong>Solid</strong> don&apos;t use a VDOM because they realize that &quot;diffing&quot; is runtime 
                  overhead. 
                  <br /><br />
                  Instead, they <strong>compile</strong> your code into direct instructions like 
                  <code>p.textContent = count</code>. When the count changes, they run *only* that line of code. 
                  They learned that the &quot;Virtual&quot; step is often unnecessary if you can track exactly 
                  which variable affects which part of the UI at compile-time.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-2">The Verdict</h4>
                <p className="text-sm italic">
                  &quot;The VDOM is a great abstraction, but it&apos;s a runtime cost. New frameworks treat the 
                  problem as a <strong>Compilation</strong> problem rather than a <strong>Reconciliation</strong> 
                  problem.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NextTopic 
        title="Mastery Dashboard"
        href="/"
        description="Explore more performance strategies and architectural deep-dives."
      />
    </div>
  );
}
