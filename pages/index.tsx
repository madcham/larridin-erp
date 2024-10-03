/* import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to Larridin ERP Integration</h1>
    </div>
  )
}

export default Home */

'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, BarChart, BookOpen, CheckCircle2, ChevronDown, ChevronUp, Clock, Factory, FileText, HelpCircle, Menu, MessageSquare, PieChart, Settings, User, Users, Zap } from 'lucide-react'

interface Task {
  id: string
  title: string
  priority: 'Low' | 'Medium' | 'High'
  estimatedTime: string
  source: string
  assignedTo: string | null
  completed: boolean
  aiSuggestions: { [key: string]: string }
}

interface TeamMember {
  id: string
  name: string
  role: string
  capacity: number
  skills: { name: string; level: number }[]
  assignedTasks: number
}

interface SAPModule {
  id: string
  name: string
  enabled: boolean
  importRules: { id: string; name: string; enabled: boolean }[]
}

export default function LarridinAIForERPDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Resolve door assembly quality issue',
      priority: 'High',
      estimatedTime: '2h',
      source: 'SAP Manufacturing Execution (ME)',
      assignedTo: null,
      completed: false,
      aiSuggestions: {
        'John Doe': 'Delegate to John due to his expertise in quality control. Suggest reviewing recent changes in the assembly process.',
        'Jane Smith': 'Assign to Jane for her production line knowledge. Recommend checking for any defective components.',
        'Mike Johnson': 'Consider Mike for his fresh perspective. Advise consulting with the quality control team for a comprehensive review.'
      }
    },
    {
      id: '2',
      title: 'Restock raw materials for production line B',
      priority: 'Medium',
      estimatedTime: '1h',
      source: 'SAP Materials Management (MM)',
      assignedTo: null,
      completed: false,
      aiSuggestions: {
        'John Doe': 'Assign to John to verify current inventory levels before restocking.',
        'Jane Smith': 'Delegate to Jane to leverage her production supervisor role. Suggest updating the production schedule accordingly.',
        'Mike Johnson': 'Consider Mike to place the order with the preferred supplier, ensuring safety stock levels are maintained.'
      }
    },
    {
      id: '3',
      title: 'Conduct safety inspection on new equipment',
      priority: 'High',
      estimatedTime: '3h',
      source: 'SAP Environment, Health, and Safety (EHS)',
      assignedTo: null,
      completed: false,
      aiSuggestions: {
        'John Doe': 'Assign to John to review equipment specifications from a quality perspective.',
        'Jane Smith': 'Delegate to Jane to assess the equipment's impact on production workflow.',
        'Mike Johnson': 'Ideal for Mike as the Safety Inspector. Recommend performing thorough safety checks and documenting findings.'
      }
    }
  ])

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      role: 'Quality Control Specialist', 
      capacity: 75,
      skills: [
        { name: 'Quality Assurance', level: 5 },
        { name: 'Process Improvement', level: 4 },
        { name: 'Data Analysis', level: 3 }
      ],
      assignedTasks: 0
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      role: 'Production Supervisor', 
      capacity: 90,
      skills: [
        { name: 'Team Leadership', level: 5 },
        { name: 'Lean Manufacturing', level: 4 },
        { name: 'Equipment Maintenance', level: 3 }
      ],
      assignedTasks: 0
    },
    { 
      id: '3', 
      name: 'Mike Johnson', 
      role: 'Safety Inspector', 
      capacity: 60,
      skills: [
        { name: 'Risk Assessment', level: 5 },
        { name: 'Regulatory Compliance', level: 4 },
        { name: 'Training & Development', level: 3 }
      ],
      assignedTasks: 0
    },
  ])

  const [sapModules, setSapModules] = useState<SAPModule[]>([
    {
      id: 'me',
      name: 'SAP Manufacturing Execution (ME)',
      enabled: true,
      importRules: [
        { id: 'me1', name: 'Import past 24hr tasks', enabled: true },
        { id: 'me2', name: 'Import high priority tasks', enabled: true },
        { id: 'me3', name: 'Import quality-related issues', enabled: false },
        { id: 'me4', name: 'Import production line alerts', enabled: false },
        { id: 'me5', name: 'Import equipment status updates', enabled: false }
      ]
    },
    {
      id: 'mm',
      name: 'SAP Materials Management (MM)',
      enabled: true,
      importRules: [
        { id: 'mm1', name: 'Import overdue tasks', enabled: true },
        { id: 'mm2', name: 'Import low inventory alerts', enabled: true },
        { id: 'mm3', name: 'Import purchase requisitions', enabled: false },
        { id: 'mm4', name: 'Import supplier performance reports', enabled: false },
        { id: 'mm5', name: 'Import material movement tasks', enabled: false }
      ]
    },
    {
      id: 'ehs',
      name: 'SAP Environment, Health, and Safety (EHS)',
      enabled: true,
      importRules: [
        { id: 'ehs1', name: 'Import safety incident reports', enabled: true },
        { id: 'ehs2', name: 'Import scheduled inspections', enabled: true },
        { id: 'ehs3', name: 'Import compliance audit tasks', enabled: false },
        { id: 'ehs4', name: 'Import environmental monitoring alerts', enabled: false },
        { id: 'ehs5', name: 'Import safety training schedules', enabled: false }
      ]
    },
    {
      id: 'pm',
      name: 'SAP Plant Maintenance (PM)',
      enabled: false,
      importRules: [
        { id: 'pm1', name: 'Import equipment maintenance schedules', enabled: true },
        { id: 'pm2', name: 'Import breakdown reports', enabled: true },
        { id: 'pm3', name: 'Import preventive maintenance tasks', enabled: false },
        { id: 'pm4', name: 'Import spare parts inventory alerts', enabled: false },
        { id: 'pm5', name: 'Import equipment performance reports', enabled: false }
      ]
    }
  ])

  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [delegationMessage, setDelegationMessage] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    teamCapacity: false,
    delegationEffectiveness: false,
  })

  const handleDelegateClick = (taskId: string, memberId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignedTo: memberId } : task
    ))
    const assignedMember = teamMembers.find(m => m.id === memberId)
    setDelegationMessage(`Task delegated to ${assignedMember?.name}!`)
    setTimeout(() => setDelegationMessage(null), 3000)

    // Update team member capacity and assigned tasks
    setTeamMembers(teamMembers.map(member =>
      member.id === memberId ? { 
        ...member, 
        capacity: Math.max(0, member.capacity - 10),
        assignedTasks: member.assignedTasks + 1
      } : member
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-500'
      case 'Medium': return 'bg-yellow-500'
      case 'High': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const renderTaskList = () => (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                <Badge className={`${getPriorityColor(task.priority)} text-white`}>{task.priority}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {task.estimatedTime}
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  {task.source}
                </Badge>
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                >
                  <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                  AI Suggestions
                  {selectedTask === task.id ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
                </Button>
                {selectedTask === task.id && (
                  <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                    {Object.entries(task.aiSuggestions).map(([memberId, suggestion]) => {
                      const member = teamMembers.find(m => m.name === memberId)
                      return (
                        <div key={memberId} className="mb-2 last:mb-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left mb-1 bg-white hover:bg-gray-50 text-gray-800 border-gray-300"
                            onClick={() => handleDelegateClick(task.id, member!.id)}
                          >
                            Delegate to {memberId}
                          </Button>
                          <p className="text-sm text-gray-600 pl-2">{suggestion}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )

  const renderTeamCapacity = () => (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">Team Capacity</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpandedSections(prev => ({ ...prev, teamCapacity: !prev.teamCapacity }))}
        >
          {expandedSections.teamCapacity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">Monitor your team's workload and available capacity for task assignment.</p>
        {expandedSections.teamCapacity && (
          <div className="space-y-4">
            {teamMembers.map(member => (
              <div key={member.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{member.name}</span>
                  <span className="text-sm font-medium text-gray-600">{member.capacity}%</span>
                </div>
                <Progress value={member.capacity} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{member.capacity > 80 ? 'High workload' : member.capacity > 50 ? 'Moderate workload' : 'Available for more tasks'}</span>
                  <span>{member.assignedTasks} tasks assigned</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderDelegationEffectiveness = () => {
    const delegationEffectiveness = 78 // This would be calculated based on various factors

    return (
      <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold text-gray-800">Delegation Effectiveness</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedSections(prev => ({ ...prev, delegationEffectiveness: !prev.delegationEffectiveness }))}
          >
            {expandedSections.delegationEffectiveness ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Assess how well tasks are being assigned and completed across your team.</p>
          {expandedSections.delegationEffectiveness && (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray={`${delegationEffectiveness}, 100`}
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">
                    {delegationEffectiveness}%
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Your delegation effectiveness is good. There's room for improvement in task distribution and team utilization.
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Improvement Suggestions:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Consider delegating more high-priority tasks to team members with lower workloads</li>
                  <li>Provide additional training to team members with lower skill levels in critical areas</li>
                  <li>Review and optimize the task assignment process to better match skills with task requirements</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Manufacturing Operations Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tasks:</span>
                <span className="text-2xl font-bold text-blue-600">{tasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Priority:</span>
                <span className="text-2xl font-bold text-red-500">{tasks.filter(t => t.priority === 'High').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Completed:</span>
                <span className="text-2xl font-bold text-green-500">{tasks.filter(t => t.completed).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">SAP Module Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sapModules.filter(module => module.enabled).map(module => (
                <div key={module.id} className="flex justify-between items-center">
                  <span className="text-gray-600">{module.name}:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {tasks.filter(t => t.source === module.name).length} tasks
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {renderTeamCapacity()}
      {renderDelegationEffectiveness()}
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Task Management</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {sapModules.filter(module => module.enabled).map(module => (
          <Badge key={module.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {module.name}: {tasks.filter(t => t.source === module.name).length} tasks
          </Badge>
        ))}
      </div>
      {renderTaskList()}
    </div>
  )

  const renderTeam = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map(member => (
          <Card key={member.id} className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-800">{member.name}</CardTitle>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Capacity</h4>
                  <Progress value={member.capacity} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{member.capacity}% utilized</span>
                    <span>{member.assignedTasks} tasks assigned</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
                  <div className="space-y-2">
                    {member.skills.map(skill => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{skill.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                i < skill.level ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Task Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder: Task completion over time</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Team Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder: Team productivity metrics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">SAP Integrations</h2>
      <p className="text-gray-600">Manage your SAP module integrations and import rules.</p>
      <div className="space-y-4">
        {sapModules.map(module => (
          <Card key={module.id} className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">{module.name}</CardTitle>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={(checked) => {
                    setSapModules(modules => modules.map(m => 
                      m.id === module.id ? { ...m, enabled: checked } : m
                    ))
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Import Rules:</p>
                {module.importRules.map((rule) => (
                  <div key={rule.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={rule.id}
                      checked={rule.enabled}
                      onCheckedChange={(checked) => {
                        setSapModules(modules => modules.map(m => 
                          m.id === module.id ? {
                            ...m,
                            importRules: m.importRules.map(r => 
                              r.id === rule.id ? { ...r, enabled: checked as boolean } : r
                            )
                          } : m
                        ))
                      }}
                    />
                    <Label htmlFor={rule.id} className="text-sm text-gray-600">{rule.name}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderGuide = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">User Guide</h2>
      <p className="text-gray-600">Welcome to Larridin AI for ERP! Here's a quick guide to help you get started:</p>
      <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md">
        <CardContent className="p-6">
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li><strong>Dashboard:</strong> Get an overview of your tasks, team capacity, and delegation effectiveness.</li>
            <li><strong>Tasks:</strong> View and manage your tasks. Use AI suggestions to delegate tasks efficiently.</li>
            <li><strong>Team:</strong> Monitor your team members' capacities, skills, and assigned tasks.</li>
            <li><strong>Analytics:</strong> View detailed charts and metrics about task completion and team productivity.</li>
            <li><strong>Integrations:</strong> Manage your SAP module integrations and customize import rules.</li>
          </ul>
        </CardContent>
      </Card>
      <p className="text-gray-600">For more detailed information, please refer to our comprehensive documentation or contact our support team.</p>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart className="w-5 h-5" />, render: renderDashboard },
    { id: 'tasks', label: 'Tasks', icon: <CheckCircle2 className="w-5 h-5" />, render: renderTasks },
    { id: 'team', label: 'Team', icon: <Users className="w-5 h-5" />, render: renderTeam },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" />, render: renderAnalytics },
    { id: 'integrations', label: 'Integrations', icon: <Settings className="w-5 h-5" />, render: renderIntegrations },
    { id: 'guide', label: 'Guide', icon: <BookOpen className="w-5 h-5" />, render: renderGuide },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <aside className="w-64 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center mb-8">
          <Factory className="w-8 h-8 text-white mr-2" />
          <h1 className="text-2xl font-bold">Larridin AI for ERP</h1>
        </div>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white bg-opacity-20 text-white shadow-lg transform scale-105'
                  : 'text-blue-100 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {tab.icon}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {tabs.find((tab) => tab.id === activeTab)?.render()}
        </div>
      </main>
      {delegationMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
          {delegationMessage}
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="fixed bottom-4 left-4 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <HelpCircle className="w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-white text-gray-800 p-2 rounded-lg shadow-lg">
            <p>Need help? Click for assistance!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}