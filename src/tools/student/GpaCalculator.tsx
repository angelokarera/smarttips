import { useState } from 'react'
import { Plus, Trash2, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Course {
  name: string
  credits: number
  grade: string
}

const gradeScales: Record<string, Record<string, number>> = {
  '4.0': { A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7, 'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, F: 0 },
  '5.0': { A: 5.0, 'A-': 4.7, 'B+': 4.3, B: 4.0, 'B-': 3.7, 'C+': 3.3, C: 3.0, 'C-': 2.7, 'D+': 2.3, D: 2.0, F: 0 },
  'percentage': { A: 100, 'A-': 92, 'B+': 88, B: 82, 'B-': 78, 'C+': 72, C: 68, 'C-': 62, 'D+': 58, D: 52, F: 0 },
}

export default function GpaCalculator() {
  const [scale, setScale] = useState('4.0')
  const [courses, setCourses] = useState<Course[]>([
    { name: 'Mathematics', credits: 3, grade: 'A' },
    { name: 'Physics', credits: 4, grade: 'B+' },
  ])

  const grades = Object.keys(gradeScales[scale])

  const addCourse = () => setCourses([...courses, { name: '', credits: 3, grade: 'A' }])
  const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index))
  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updated = [...courses]
    updated[index] = { ...updated[index], [field]: value }
    setCourses(updated)
  }

  const gpa = (() => {
    let totalPoints = 0
    let totalCredits = 0
    courses.forEach((course) => {
      const points = gradeScales[scale][course.grade] || 0
      totalPoints += points * course.credits
      totalCredits += course.credits
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  })()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Label className="mb-2 block">Grading Scale</Label>
          <Select value={scale} onValueChange={setScale}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="4.0">4.0 Scale</SelectItem>
              <SelectItem value="5.0">5.0 Scale</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-5">
              <Input placeholder="Course name" value={course.name} onChange={(e) => updateCourse(index, 'name', e.target.value)} />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Credits" value={course.credits} onChange={(e) => updateCourse(index, 'credits', Number(e.target.value))} />
            </div>
            <div className="col-span-3">
              <Select value={course.grade} onValueChange={(v) => updateCourse(index, 'grade', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {grades.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => removeCourse(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addCourse}>
        <Plus className="h-4 w-4 mr-2" />
        Add Course
      </Button>

      <div className="p-6 rounded-xl border border-border bg-muted/30 text-center">
        <GraduationCap className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">Your GPA</p>
        <p className="text-5xl font-bold">{gpa}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Based on {courses.length} course{courses.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
