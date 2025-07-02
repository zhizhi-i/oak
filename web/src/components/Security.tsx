import React from 'react'
import { Shield, Lock, Eye, CheckCircle, Award, Globe } from 'lucide-react'

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'SOC 2 Type II Certification',
      description: 'Rigorous security controls and compliance audits ensure your data security',
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data transmission and storage uses AES-256 encryption, bank-level security standards',
      color: 'green'
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Strictly complies with GDPR and local privacy regulations, never accesses your sensitive data',
      color: 'purple'
    }
  ]

  const reliabilityMetrics = [
    { metric: '99.9%', label: 'Service Availability', description: '24/7 stable operation' },
    { metric: '<50ms', label: 'Response Latency', description: 'Ultra-fast response speed' },
    { metric: '99.99%', label: 'Data Accuracy', description: 'Reliable processing results' },
    { metric: '24/7', label: 'Technical Support', description: '24/7 professional service' }
  ]

  const certifications = [
    { name: 'SOC 2 Type II', icon: Award },
    { name: 'ISO 27001', icon: CheckCircle },
    { name: 'GDPR Compliant', icon: Shield },
    { name: 'CCPA Compliant', icon: Lock },
    { name: 'Enterprise SLA', icon: Globe },
    { name: 'PCI DSS', icon: CheckCircle }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
      case 'green': return 'from-green-500/20 to-green-600/20 border-green-500/30'
      case 'purple': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30'
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Enterprise-Grade Security Assurance
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We understand the importance of data security and adopt the highest security standards to protect your business data
          </p>
        </div>

        {/* Security Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            const colorClasses = getColorClasses(feature.color)
            
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${colorClasses} rounded-2xl p-8 border transition-all duration-300 hover:scale-105`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Reliability Metrics */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Reliability Metrics
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reliabilityMetrics.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {item.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {item.label}
                </div>
                <div className="text-gray-400 text-sm">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Architecture */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Multi-layer Security Architecture
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Network Security Layer</h4>
                  <p className="text-gray-300">DDoS protection, WAF firewall, intrusion detection systems</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Application Security Layer</h4>
                  <p className="text-gray-300">Identity authentication, access control, API security protection</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Data Security Layer</h4>
                  <p className="text-gray-300">Encrypted storage, secure transmission, data masking</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Monitoring and Audit Layer</h4>
                  <p className="text-gray-300">Real-time monitoring, log auditing, anomaly alerts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4">Security Commitment</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Data will never be used to train AI models</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Zero-trust architecture, principle of least privilege</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Regular security testing and vulnerability assessments</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Data localization storage options</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">24-hour security incident response</span>
              </div>
            </div>
          </div>
        </div>



        {/* Trust Section */}
        <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-2xl p-8 border border-blue-500/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Trusted AI Partner
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We provide more than just technical solutions - we are your trusted long-term partner.
            Strict security standards and transparent privacy policies ensure you can use our services with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Security Whitepaper
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Contact Security Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Security
