import { useState } from 'react'
import { Plus, Trash2, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Assignment {
  name: string
  score: number
  maxScore: number
  weight: number
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { name: 'Homework 1', score: 85, maxScore: 100, weight: 20 },
    { name: 'Midterm', score: 78, maxScore: 100, weight: 30 },
    { name: 'Final', score: 0, maxScore: 100, weight: 50 },
  ])
  const [targetGrade, setTargetGrade] = useState(80)

  const addAssignment = () => setAssignments([...assignments, { name: '', score: 0, maxScore: 100, weight: 0 }])
  const removeAssignment = (index: number) => setAssignments(assignments.filter((_, i) => i !== index))
  const updateAssignment = (index: number, field: keyof Assignment, value: string | number) => {
    const updated = [...assignments]
    updated[index] = { ...updated[index], [field]: value }
    setAssignments(updated)
  }

  const currentGrade = (() => {
    let weightedSum = 0
    let totalWeight = 0
    assignments.forEach((a) => {
      if (a.maxScore > 0) {
        const percentage = (a.score / a.maxScore) * 100
        weightedSum += percentage * a.weight
        totalWeight += a.weight
      }
    })
    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : '0.00'
  })()

  const neededScore = (() => {
    const remaining = assignments.find((a) => a.score === 0 && a.weight > 0)
    if (!remaining) return null
    const currentWeighted = assignments.reduce((sum, a) => {
      if (a.score > 0 && a.maxScore > 0) {
        return sum + ((a.score / a.maxScore) * 100) * a.weight
      }
      return sum
    }, 0)
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0)
    const needed = ((targetGrade * totalWeight - currentWeighted) / remaining.weight)
    return needed > 100 ? 'Impossible' : needed < 0 ? 'Already achieved' : needed.toFixed(2) + '%'
  })()

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3">
              <Input placeholder="Name" value={assignment.name} onChange={(e) => updateAssignment(index, 'name', e.target.value)} />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Score" value={assignment.score} onChange={(e) => updateAssignment(index, 'score', Number(e.target.value))} />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Max" value={assignment.maxScore} onChange={(e) => updateAssignment(index, 'maxScore', Number(e.target.value))} />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Weight %" value={assignment.weight} onChange={(e) => updateAssignment(index, 'weight', Number(e.target.value))} />
            </div>
            <div className="col-span-2 text-right text-sm">
              {assignment.maxScore > 0 ? ((assignment.score / assignment.maxScore) * 100).toFixed(1) : 0}%
            </div>
            <div className="col-span-1 flex justify-end">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeAssignment(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addAssignment}>
        <Plus className="h-4 w-4 mr-2" />
        Add Assignment
      </Button>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-border bg-muted/30 text-center">
          <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-1">Current Grade</p>
          <p className="text-4xl font-bold">{currentGrade}%</p>
        </div>

        <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-3">
          <Label>Target Grade (%)</Label>
          <Input type="number" value={targetGrade} onChange={(e) => setTargetGrade(Number(e.target.value))} />
          {neededScore && (
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">Needed on remaining work:</p>
              <p className="text-2xl font-bold">{neededScore}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
