import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, 
  Cpu, 
  Eye, 
  Truck, 
  GraduationCap, 
  TreePine, 
  Glasses
} from 'lucide-react'

const modules = [
  {
    title: "Predictive Analytics",
    description: "Forecast production bottlenecks and maintenance needs.",
    icon: <BarChart className="w-6 h-6" />,
    gradient: "from-blue-500 to-purple-500"
  },
  {
    title: "IoT Integration",
    description: "Connect with sensors for real-time machine performance data.",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "AI Quality Control",
    description: "Use computer vision to detect product defects automatically.",
    icon: <Eye className="w-6 h-6" />,
    gradient: "from-red-500 to-pink-500"
  },
  {
    title: "Supply Chain Optimization",
    description: "Manage suppliers and optimize order timing and quantities.",
    icon: <Truck className="w-6 h-6" />,
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Skill Development",
    description: "Analyze performance to suggest relevant employee training.",
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    title: "Sustainability Tracking",
    description: "Monitor and optimize energy usage and waste production.",
    icon: <TreePine className="w-6 h-6" />,
    gradient: "from-green-600 to-lime-500"
  },
  {
    title: "AR Integration",
    description: "Provide visual guides for maintenance and training.",
    icon: <Glasses className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500"
  }
]

export default function FutureModules() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Future Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className={`bg-gradient-to-br ${module.gradient} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
              {module.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm">{module.description}</p>
              <Badge className="mt-4 bg-white text-gray-800">Coming Soon</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}