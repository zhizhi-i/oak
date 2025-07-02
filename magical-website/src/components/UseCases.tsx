import React, { useState } from 'react'
import { Building2, ShoppingCart, Heart, TrendingUp, FileText, Users } from 'lucide-react'

const UseCases = () => {
  const [activeTab, setActiveTab] = useState(0)

  const industries = [
    {
      icon: Building2,
      name: 'Financial Services',
      color: 'blue',
      useCases: [
        { title: 'Customer Onboarding', automation: 'Automated document verification and account opening', savings: 'Save 70% time' },
        { title: 'Compliance Reporting', automation: 'Intelligent data collection and report generation', savings: 'Reduce 80% errors' },
        { title: 'Risk Assessment', automation: 'Real-time risk indicator monitoring and alerts', savings: 'Improve 90% accuracy' }
      ]
    },
    {
      icon: ShoppingCart,
      name: 'E-commerce Retail',
      color: 'green',
      useCases: [
        { title: 'Order Processing', automation: 'Full automation from order to shipment', savings: 'Improve 85% efficiency' },
        { title: 'Inventory Management', automation: 'Smart replenishment and inventory optimization', savings: 'Reduce 30% inventory costs' },
        { title: 'Customer Service', automation: 'AI chatbots and intelligent issue routing', savings: '24/7 service availability' }
      ]
    },
    {
      icon: Heart,
      name: 'Healthcare',
      color: 'red',
      useCases: [
        { title: 'Patient Appointment Management', automation: 'Smart scheduling and reminder systems', savings: 'Reduce 60% no-shows' },
        { title: 'Medical Record Entry', automation: 'Voice recognition and structured storage', savings: 'Save 75% time' },
        { title: 'Medication Management', automation: 'Medication reminders and inventory monitoring', savings: 'Improve 95% compliance' }
      ]
    },
    {
      icon: TrendingUp,
      name: 'Manufacturing',
      color: 'orange',
      useCases: [
        { title: 'Quality Inspection', automation: 'Computer vision AI and anomaly detection', savings: 'Improve 99% accuracy' },
        { title: 'Supply Chain Management', automation: 'Smart procurement and logistics optimization', savings: 'Reduce 25% costs' },
        { title: 'Equipment Maintenance', automation: 'Predictive maintenance and scheduling', savings: 'Reduce 40% downtime' }
      ]
    }
  ]

  const integrations = [
    'Salesforce', 'HubSpot', 'Slack', 'Microsoft Teams', 'Google Workspace', 
    'Notion', 'Airtable', 'Zapier', 'Monday.com', 'Asana', 'Jira', 'SAP'
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' }
      case 'green': return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' }
      case 'red': return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' }
      case 'orange': return { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' }
      default: return { bg: 'bg-gray-500', text: 'text-gray-400', border: 'border-gray-500' }
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Intelligent Solutions for Every Industry
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No matter what industry you're in, our AI can tailor automation solutions to your needs
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {industries.map((industry, index) => {
            const colors = getColorClasses(industry.color)
            const Icon = industry.icon
            
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-200 ${
                  activeTab === index
                    ? `${colors.bg} text-white ${colors.border}`
                    : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-gray-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{industry.name}</span>
              </button>
            )
          })}
        </div>

        {/* Active Industry Content */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {industries[activeTab].useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {useCase.automation}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getColorClasses(industries[activeTab].color).text} bg-gray-800/50`}>
                  {useCase.savings}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-8">
            Seamless Integration with Your Existing Tools
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500/30 transition-all duration-200 hover:scale-105"
              >
                <div className="text-gray-300 font-medium text-sm text-center">
                  {integration}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-gray-400 mt-6">
            Plus 500+ other applications
          </p>
        </div>

        {/* Workflow Example */}
        <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-2xl p-8 border border-blue-500/30">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Typical Automation Workflow Example
          </h3>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Data Collection</h4>
              <p className="text-gray-300 text-sm">Automatically collect and organize data from multiple source systems</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Intelligent Analysis</h4>
              <p className="text-gray-300 text-sm">AI analyzes data patterns and generates insights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Automated Decision</h4>
              <p className="text-gray-300 text-sm">Make intelligent decisions based on rules and machine learning</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Execute Actions</h4>
              <p className="text-gray-300 text-sm">Execute corresponding actions in relevant systems</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
            Explore Your Industry Solutions
          </button>
        </div>
      </div>
    </section>
  )
}

export default UseCases
