import React, { useState } from 'react'
import { useSkipData } from '../../hooks/useSkipData'

const ErrorTestWithAPI: React.FC = () => {
    const [testBadApi, setTestBadApi] = useState(false)

    const {skips, loading, error} = useSkipData(
        testBadApi ? 'INVALID_POSTCODE' : 'NR32',
        testBadApi ? '' : 'LoweStoft'
    )

  return (
    <div className="p-6 border rounded-lg bg-blue-50">
      <h3 className="text-lg font-semibold mb-4">API Error Test</h3>
      
      <button
        onClick={() => setTestBadApi(!testBadApi)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
      >
        {testBadApi ? 'Use Valid API' : 'Test Invalid API'}
      </button>

      {loading && <p>Loading...</p>}
      {error && (
        <div className="text-red-600 p-2 bg-red-50 rounded">
          API Error: {error.message}
        </div>
      )}
      {skips.length > 0 && <p className="text-green-600">API working correctly!</p>}
    </div>
  )
}

export default ErrorTestWithAPI