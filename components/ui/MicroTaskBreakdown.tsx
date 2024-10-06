import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp } from 'lucide-react'

interface MicroTask {
  id: string
  description: string
  completed: boolean
}

interface Task {
  id: string
  title: string
  description: string
  microTasks?: MicroTask[]
}

export function MicroTaskBreakdown({ task }: { task?: Task }) {
  const [expanded, setExpanded] = useState(false)
  const [microTasks, setMicroTasks] = useState<MicroTask[]>(task?.microTasks || [])

  const toggleMicroTask = (id: string) => {
    setMicroTasks(microTasks.map(mt => 
      mt.id === id ? { ...mt, completed: !mt.completed } : mt
    ))
  }

  const progress = microTasks.length > 0
    ? (microTasks.filter(mt => mt.completed).length / microTasks.length) * 100
    : 0

  if (!task) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent>
          <p className="text-center text-gray-500">No task data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{task.description}</p>
        <Progress value={progress} className="w-full mb-4" />
        {expanded && (
          <div className="space-y-2">
            {microTasks.length > 0 ? (
              microTasks.map((mt) => (
                <div key={mt.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={mt.id}
                    checked={mt.completed}
                    onCheckedChange={() => toggleMicroTask(mt.id)}
                  />
                  <label
                    htmlFor={mt.id}
                    className={`text-sm ${mt.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                  >
                    {mt.description}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No micro-tasks available for this task.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}