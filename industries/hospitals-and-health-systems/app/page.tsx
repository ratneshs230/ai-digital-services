import Link from 'next/link'

export const metadata = {
  title: 'AI-Powered Patient Triage & Routing | Hospitals and health systems',
  description: 'Intelligent system that analyzes patient symptoms and medical history to route them to the most appropriate care setting (e.g., ER, urgent care, telehealth).',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            Hospitals and health systems
          </span>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            AI-Powered Patient Triage & Routing
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Intelligent system that analyzes patient symptoms and medical history to route them to the most appropriate care setting (e.g., ER, urgent care, telehealth).
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/demo"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Try Demo
            </Link>
            <a
              href="/"
              className="px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 1</h3>
              <p className="text-gray-600 text-sm">Symptom Checker</p>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 2</h3>
              <p className="text-gray-600 text-sm">Medical History Integration</p>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 3</h3>
              <p className="text-gray-600 text-sm">Care Setting Recommendation</p>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 4</h3>
              <p className="text-gray-600 text-sm">Facility Locator</p>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 5</h3>
              <p className="text-gray-600 text-sm">Telehealth Integration</p>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-2">Feature 6</h3>
              <p className="text-gray-600 text-sm">Real-time Monitoring Dashboard</p>
            </div>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Problem</h2>
            <p className="text-gray-600">Reduces ER overcrowding, improves patient wait times, and ensures patients receive the right level of care.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-gray-600">An AI model trained on medical data analyzes patient-reported symptoms and medical history to predict the optimal care setting and provide routing recommendations.</p>
          </div>
        </div>

        {/* Use Case */}
        <div className="mt-20 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Example Use Case</h2>
          <p className="text-gray-700">A patient experiencing chest pain uses a mobile app to describe their symptoms. The AI determines the severity and routes the patient to the nearest appropriate facility – either the ER or an urgent care based on risk factors.</p>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Transform your hospitals and health systems operations with AI</p>
          <Link
            href="/demo"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Try the Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
