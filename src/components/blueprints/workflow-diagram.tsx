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
          <div key={i} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl border",
                  isLarge ? "h-16 w-16" : "h-12 w-12"
                )}
                style={{
                  backgroundColor: node.color + "15",
                  borderColor: node.color + "35",
                }}
              >
                <Icon
                  className={cn(isLarge ? "h-7 w-7" : "h-5 w-5")}
                  style={{ color: node.color }}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className={cn(
                  "text-center font-mono text-fg-tertiary",
                  isLarge ? "text-xs max-w-[80px]" : "text-[10px] max-w-[64px]"
                )}
              >
                {node.label}
              </span>
            </div>

            {/* Connector arrow */}
            {i < nodes.length - 1 && (
              <div className={cn("flex items-center", isLarge ? "mx-4" : "mx-2")}>
                <div
                  className={cn(
                    "h-px",
                    isLarge ? "w-10" : "w-6"
                  )}
                  style={{ backgroundColor: "#2a2a2a" }}
                />
                <div
                  className="h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent"
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
