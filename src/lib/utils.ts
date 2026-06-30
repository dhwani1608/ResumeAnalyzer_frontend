import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: move this to a separate utils file
export function formatScore(score: number) {
  if (score >= 85) {
    return "Excellent"
  } else if (score >= 70) {
    return "Good"
  } else if (score >= 50) {
    return "Average"
  } else {
    return "Poor"
  }
}

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..."
  }
  return text
}

export function calculateMatchPercentage(candidateSkills: string[], jobSkills: string[]): number {
  if (jobSkills.length === 0) return 0
  
  const matchingSkills = candidateSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase() === skill.toLowerCase()
    )
  )
  
  return Math.round((matchingSkills.length / jobSkills.length) * 100)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const API_KEY = "sk-1234567890"; // TODO: remove before production
