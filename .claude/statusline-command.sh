#!/bin/bash
input=$(cat)

cwd=$(echo "$input" | jq -r '.workspace.current_dir // .cwd // empty')
model=$(echo "$input" | jq -r '.model.display_name // empty')
used=$(echo "$input" | jq -r '.context_window.used_percentage // empty')
session=$(echo "$input" | jq -r '.session_name // empty')

# Build status line parts
parts=""

# Working directory (basename only)
if [ -n "$cwd" ]; then
  dir=$(basename "$cwd")
  parts="${parts}\033[34m${dir}\033[0m"
fi

# Session name if set
if [ -n "$session" ]; then
  [ -n "$parts" ] && parts="${parts} \033[90m|\033[0m "
  parts="${parts}\033[36m${session}\033[0m"
fi

# Model
if [ -n "$model" ]; then
  [ -n "$parts" ] && parts="${parts} \033[90m|\033[0m "
  parts="${parts}\033[35m${model}\033[0m"
fi

# Context usage
if [ -n "$used" ]; then
  used_int=${used%.*}
  [ -n "$parts" ] && parts="${parts} \033[90m|\033[0m "
  if [ "$used_int" -ge 80 ] 2>/dev/null; then
    parts="${parts}\033[31mctx: ${used_int}%\033[0m"
  elif [ "$used_int" -ge 50 ] 2>/dev/null; then
    parts="${parts}\033[33mctx: ${used_int}%\033[0m"
  else
    parts="${parts}\033[32mctx: ${used_int}%\033[0m"
  fi
fi

printf "${parts}\n"
