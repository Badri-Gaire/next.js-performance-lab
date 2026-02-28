'use client';

import { motion } from 'framer-motion';
import { Globe, Zap, ShieldCheck, Send, Inbox, Server } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const steps = [
  {
    id: 'dns',
    title: 'DNS Lookup',
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    desc: 'Hostname to IP Resolution',
    details: 'The browser resolves the human-readable domain (lab.badrigaire.com.np) to an IP address. It checks local cache, ISP resolvers, and root nameservers to find the A/AAAA records.'
  },
  {
    id: 'tcp',
    title: 'TCP Handshake',
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    desc: 'Connecting to the Server',
    details: 'A "three-way handshake" (SYN, SYN-ACK, ACK) establishes a reliable connection. This ensures both parties are ready to exchange data.'
  },
  {
    id: 'tls',
    title: 'TLS Negotiation',
    icon: ShieldCheck,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    desc: 'SSL/TLS Security Layer',
    details: 'The browser and server agree on encryption keys and verify the SSL certificate. TLS 1.3 optimizes this to 1 round trip, securing the channel before any data flows.'
  },
  {
    id: 'request',
    title: 'HTTP Request',
    icon: Send,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    desc: 'Sending the GET Request',
    details: 'The browser sends the HTTP GET request for the document. Headers like User-Agent, Accept, and Cookie are sent to inform the server of the browser\'s capabilities.'
  },
  {
    id: 'ttfb',
    title: 'TTFB / Stream',
    icon: Inbox,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    desc: 'Time To First Byte',
    details: 'The server processes the request and sends the first byte of the HTML response. This is a critical performance metric (TTFB) before the browser can even begin parsing.'
  }
];

export function NetworkLifecycle() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-3xl space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">
            Phase 0: Pre-Parsing
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Network & Navigation</h2>
          <p className="text-zinc-500 text-sm font-medium italic">What happens before the browser sees a single character of code.</p>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
             <button 
              key={i}
              onClick={() => setActiveStep(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                activeStep === i ? "bg-blue-600 w-8" : "bg-zinc-800 hover:bg-zinc-700"
              )}
             />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-900 -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = activeStep > i;

            return (
              <motion.div 
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "cursor-pointer p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center gap-4 relative z-10",
                  isActive ? "bg-zinc-800 border-blue-500/50 scale-105 shadow-2xl shadow-blue-500/10" : "bg-zinc-900/50 border-zinc-800 opacity-60 hover:opacity-100",
                  isPast && "border-green-500/20"
                )}
              >
                <div className={cn("p-3 rounded-2xl", isActive ? step.bg : "bg-zinc-800")}>
                  <Icon className={cn("w-6 h-6", isActive ? step.color : "text-zinc-600")} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Step {i + 1}</h4>
                  <p className="text-xs font-bold text-white whitespace-nowrap">{step.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div 
        key={activeStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800"
      >
        <div className="space-y-4">
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", steps[activeStep].bg, steps[activeStep].color)}>
            Protocol Detail: {steps[activeStep].title}
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{steps[activeStep].desc}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            {steps[activeStep].details}
          </p>
        </div>

        <div className="relative rounded-2xl bg-black border border-zinc-800 p-6 font-mono text-[11px] overflow-hidden group">
           {activeStep === 0 && (
             <div className="space-y-2 text-zinc-400">
               <div className="flex justify-between items-center text-blue-400 border-b border-zinc-900 pb-2">
                 <span>Browser Cache</span>
                 <span className="text-[9px] uppercase font-black">MISS</span>
               </div>
               <div className="flex justify-between items-center text-zinc-500">
                 <span>OS Resolver</span>
                 <span className="text-[9px] uppercase font-black">SEARCHING...</span>
               </div>
               <div className="flex justify-items-center gap-2 pt-4">
                 <Server className="w-4 h-4 text-blue-500" />
                 <span className="text-white font-bold">76.76.21.21</span>
                 <span className="text-zinc-600">(Vercel Edge)</span>
               </div>
             </div>
           )}
           {activeStep === 1 && (
             <div className="space-y-1">
               <div className="text-green-500">{"[CLIENT] -> SYN"}</div>
               <div className="text-yellow-500 font-bold">{"[SERVER] <- SYN-ACK"}</div>
               <div className="text-green-500">{"[CLIENT] -> ACK"}</div>
               <div className="text-zinc-600 pt-2 italic">{"// Connection Established"}</div>
             </div>
           )}
           {activeStep === 2 && (
             <div className="space-y-1">
               <div className="flex items-center gap-2 text-green-400">
                 <ShieldCheck className="w-4 h-4" />
                 <span>TLS 1.3 Handshake</span>
               </div>
               <div className="text-zinc-500 pl-6">Client Hello...</div>
               <div className="text-zinc-500 pl-6">Server Hello, Certificate...</div>
               <div className="pl-6 text-[10px] text-green-600">Encrypted Channel Ready</div>
             </div>
           )}
           {activeStep === 3 && (
             <pre className="text-purple-400">
{`GET /browser-pipeline HTTP/1.1
Host: lab.badrigaire.com.np
User-Agent: Mozilla/5.0...
Accept: text/html...
Cache-Control: no-cache`}
             </pre>
           )}
           {activeStep === 4 && (
             <div className="space-y-2">
               <pre className="text-orange-400">
{`HTTP/1.1 200 OK
Content-Type: text/html
Transfer-Encoding: chunked`}
               </pre>
               <div className="text-[10px] text-zinc-600 flex items-center gap-2 animate-pulse">
                 <Inbox className="w-3 h-3" />
                 Receiving bytes...
               </div>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
