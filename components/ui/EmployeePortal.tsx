import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, MessageSquare, BarChart, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Task {
  id: string
  title: string
  status: 'In Progress' | 'Completed'
  timeSpent: number
  estimatedTime: number
  rationale: string
}

export default function EmployeePortal() {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Review production line efficiency', 
      status: 'In Progress', 
      timeSpent: 2, 
      estimatedTime: 8,
      rationale: 'Your expertise in process optimization is crucial for this task.'
    },
    { 
      id: '2', 
      title: 'Update safety protocols', 
      status: 'Completed', 
      timeSpent: 4, 
      estimatedTime: 4,
      rationale: 'Your recent safety training makes you the ideal person for this update.'
    },
    { 
      id: '3', 
      title: 'Conduct team training session', 
      status: 'In Progress', 
      timeSpent: 1, 
      estimatedTime: 3,
      rationale: 'Your communication skills and subject knowledge will ensure an effective training session.'
    },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleTimeUpdate = (taskId: string, newTime: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, timeSpent: newTime } : task
    ))
  }

  const handleStatusToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: task.status === 'In Progress' ? 'Completed' : 'In Progress' } : task
    ))
  }

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage)
    setNewMessage('')
    // Here you would typically send the message to a backend service
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-md">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-800">My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusToggle(task.id)}
                  >
                    <CheckCircle2 className={task.status === 'Completed' ? 'text-green-500' : 'text-gray-300'} />
                  </Button>
                  <div>
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{task.timeSpent}h / {task.estimatedTime}h</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={task.timeSpent}
                    onChange={(e) => handleTimeUpdate(task.id, Number(e.target.value))}
                    className="w-16 bg-gray-50 border-gray-200"
                  />
                  <Badge variant={task.status === 'Completed' ? 'default' : 'secondary'} className="bg-purple-100 text-purple-800">
                    {task.status}
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-purple-600" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-gray-800 border border-gray-200 p-2 rounded shadow-lg">
                        <p>{task.rationale}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-800">Communication Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-[200px] border rounded-md p-4 bg-gray-50">
              {/* Messages would be displayed here */}
              <p className="text-gray-500 text-center">No messages yet</p>
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-gray-50 border-gray-200"
              />
              <Button onClick={handleSendMessage} className="bg-purple-600 hover:bg-purple-700 text-white">Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-md">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-800">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Productivity</h3>
            <p className="text-sm text-gray-600">Measures the number of tasks you complete relative to your goals.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Tasks Completed This Week</span>
              <span className="text-sm font-medium text-gray-600">15 / 20</span>
            </div>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-gray-500">75% completion rate</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Quality</h3>
            <p className="text-sm text-gray-600">Reflects the standard of your work based on reviews and feedback.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Work Quality Rating</span>
              <span className="text-sm font-medium text-gray-600">4.5 / 5</span>
            </div>
            <Progress value={90} className="w-full" />
            <p className="text-sm text-gray-500">90% quality rating</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Efficiency</h3>
            <p className="text-sm text-gray-600">Indicates how well you manage your time against task estimates.</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Time Efficiency</span>
              <span className="text-sm font-medium text-gray-600">85%</span>
            </div>
            <Progress value={85} className="w-full" />
            <p className="text-sm text-gray-500">85% of tasks completed within estimated time</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}