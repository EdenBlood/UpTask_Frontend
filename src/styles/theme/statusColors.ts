export const statusColors: { [key: string]: string } = {
  pending: "border-t-slate-400/85 dark:border-t-slate-400/85",
  onHold: "border-t-red-400/85 dark:border-t-red-400/85",
  inProgress: "border-t-indigo-400/85 dark:border-t-indigo-400/85",
  underReview: "border-t-amber-400/85 dark:border-t-amber-400/85",
  completed: "border-t-emerald-400/85 dark:border-t-emerald-400/85"
}

export const textStatusColors: { [key: string]: string } = {
  pending: "text-slate-400 dark:text-slate-400",
  onHold: "text-red-400 dark:text-red-400",
  inProgress: "text-indigo-400 dark:text-indigo-400",
  underReview: "text-amber-500 dark:text-amber-500",
  completed: "text-emerald-400 dark:text-emerald-400"
}