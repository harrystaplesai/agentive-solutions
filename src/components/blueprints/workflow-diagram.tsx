"use client";

import type { WorkflowNode } from "@/content/blueprints";
import { cn } from "@/lib/utils";
import {
  Mail, Paperclip, Brain, FolderOpen, FileText, Layers, Database,
  MessageSquare, Building2, TrendingDown, PenLine, Bell, BarChart3,
  ListChecks, CheckCircle, Users, Search, ShieldCheck, UserPlus,
  User, Gauge, ThumbsUp, Contact, ClipboardList, Sparkles, Eye,
  FileOutput, Inbox, ScanText, GitBranch, Globe, BookOpen, Star,
  Send, CalendarClock, Clock, AlertTriangle, RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Mail, Paperclip, Brain, FolderOpen, FileText, Layers, Database,
  MessageSquare, Building2, TrendingDown, PenLine, Bell, BarChart3,
  ListChecks, CheckCircle, Users, Search, ShieldCheck, UserPlus,
  User, Gauge, ThumbsUp, Contact, ClipboardList, Sparkles, Eye,
  FileOutput, Inbox, ScanText, GitBranch, Globe, BookOpen, Star,
  Send, CalendarClock, Clock, AlertTriangle, RefreshCw,
};

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  size?: "small" | "large";
}

export function WorkflowDiagram({ nodes, size = "small" }: WorkflowDiagramProps) {
  const isLarge = size === "large";

  return (
    <div className="flex items-center justify-center gap-0" aria-hidden="true">
      {nodes.map((node, i) => {
        const Icon = iconMap[node.icon] || Database;

        return (
          <div key={i} className="flex items-center min-w-0">
            {/* Node */}
            <div className="flex flex-col items-center gap-1 md:gap-2 min-w-0">
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl border",
                  isLarge ? "h-9 w-9 md:h-16 md:w-16" : "h-9 w-9 md:h-12 md:w-12"
                )}
                style={{
                  backgroundColor: node.color + "15",
                  borderColor: node.color + "35",
                }}
              >
                <Icon
                  className={cn(isLarge ? "h-4 w-4 md:h-7 md:w-7" : "h-4 w-4 md:h-5 md:w-5")}
                  style={{ color: node.color }}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className={cn(
                  "text-center font-mono text-fg-tertiary",
                  isLarge ? "text-[8px] max-w-[48px] md:text-xs md:max-w-[80px] leading-tight" : "text-[8px] max-w-[44px] md:text-[10px] md:max-w-[64px] leading-tight"
                )}
              >
                {node.label}
              </span>
            </div>

            {/* Connector arrow */}
            {i < nodes.length - 1 && (
              <div className={cn("flex items-center", isLarge ? "mx-1.5 md:mx-4" : "mx-1 md:mx-2")}>
                <div
                  className={cn(
                    "h-px",
                    isLarge ? "w-4 md:w-10" : "w-3 md:w-6"
                  )}
                  style={{ backgroundColor: "#2a2a2a" }}
                />
                <div
                  className="h-0 w-0 border-y-[2px] border-l-[4px] border-y-transparent md:border-y-[3px] md:border-l-[5px]"
                  style={{ borderLeftColor: nodes[i + 1].color + "60" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
