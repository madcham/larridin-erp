import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface DelegationFactor {
  name: string
  weight: number
  description: string
}

interface GlobalPreference {
  name: string
  enabled: boolean
  description: string
}

export default function DelegationSettings() {
  const [factors, setFactors] = useState<DelegationFactor[]>([
    { 
      name: "Skill Level", 
      weight: 50, 
      description: "Prioritize assigning tasks to team members with higher skill levels in relevant areas."
    },
    { 
      name: "Current Workload", 
      weight: 30, 
      description: "Consider the existing tasks and responsibilities of team members when delegating."
    },
    { 
      name: "Task Urgency", 
      weight: 20, 
      description: "Give higher priority to urgent tasks in the delegation process."
    },
  ])

  const [preferences, setPreferences] = useState<GlobalPreference[]>([
    { 
      name: "Prioritize Even Distribution", 
      enabled: true, 
      description: "Attempt to distribute tasks evenly among team members, balancing workloads."
    },
    { 
      name: "Allow Overtime", 
      enabled: false, 
      description: "Permit task assignment that may require team members to work beyond regular hours."
    },
    { 
      name: "Consider Employee Preferences", 
      enabled: true, 
      description: "Take into account individual team member's task preferences when delegating."
    },
  ])

  const handleFactorChange = (index: number, newWeight: number) => {
    const newFactors = [...factors]
    newFactors[index].weight = newWeight
    setFactors(newFactors)
  }

  const handlePreferenceChange = (index: number) => {
    const newPreferences = [...preferences]
    newPreferences[index].enabled = !newPreferences[index].enabled
    setPreferences(newPreferences)
  }

  const handleSave = () => {
    console.log("Saving settings:", { factors, preferences })
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Delegation Factors</CardTitle>
          <CardDescription className="text-gray-600">
            Adjust the importance of each factor in the AI's task delegation algorithm.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {factors.map((factor, index) => (
            <div key={factor.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-700 font-semibold">{factor.name}</Label>
                <span className="text-sm text-gray-600 font-medium">{factor.weight}%</span>
              </div>
              <Slider
                value={[factor.weight]}
                onValueChange={(value) => handleFactorChange(index, value[0])}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-purple-600"
              />
              <p className="text-sm text-gray-600">{factor.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Global Preferences</CardTitle>
          <CardDescription className="text-gray-600">
            Set overall preferences for how the AI should approach task delegation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {preferences.map((pref, index) => (
            <div key={pref.name} className="flex items-center justify-between space-x-4">
              <div>
                <Label htmlFor={`pref-${index}`} className="text-gray-700 font-semibold">{pref.name}</Label>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
              <Switch
                id={`pref-${index}`}
                checked={pref.enabled}
                onCheckedChange={() => handlePreferenceChange(index)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Based on current settings, tasks will be primarily assigned by skill level ({factors[0].weight}%), 
            with consideration for workload ({factors[1].weight}%) and urgency ({factors[2].weight}%). 
            {preferences[0].enabled && "Even distribution is prioritized. "}
            {preferences[1].enabled && "Overtime is allowed if necessary. "}
            {preferences[2].enabled && "Employee preferences are taken into account."}
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Settings</Button>
    </div>
  )
}