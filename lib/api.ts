import type { Branch, FileChange, FeatureExplanation, UnitTest, CodeImpact } from "@/lib/types"
import type { TestState } from "@/context/test-state-context"
import { logApiRequest, logApiResponse } from "@/lib/debug"

// Base URL for the FastAPI backend
// First try to use the environment variable, then fall back to relative URL
const API_BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin + "/api" // Use relative path as fallback
    : process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

// Timeout for fetch requests in milliseconds
const FETCH_TIMEOUT = 5000

/**
 * Fetch with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = FETCH_TIMEOUT): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

/**
 * Fetch all branches and commits
 */
export async function fetchBranches(): Promise<Branch[]> {
  const endpoint = `/api/branches`
  logApiRequest(endpoint)

  try {
    // First try to fetch from the Next.js API route
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch branches: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error("Error fetching branches:", error)

    // If we're in development mode, provide some mock data for easier debugging
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for branches due to API error")
      return [
        {
          name: "main",
          commits: [
            {
              id: "mock-commit-1",
              message: "Mock commit for debugging",
              author: "Debug User",
              date: new Date().toISOString(),
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ],
        },
      ]
    }

    throw error
  }
}

/**
 * Fetch file changes for a specific commit
 */
export async function fetchFileChanges(commitId: string): Promise<FileChange[]> {
  const endpoint = `/api/commits/${commitId}/changes`
  logApiRequest(endpoint, { commitId })

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch changes for commit ${commitId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error fetching changes for commit ${commitId}:`, error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for file changes due to API error")
      return [
        {
          id: "mock-change-1",
          filePath: "mock/file/path.js",
          changeType: "modified",
          diff: "// Mock diff content for debugging",
        },
      ]
    }

    throw error
  }
}

/**
 * Fetch explanation for a specific file change
 */
export async function fetchExplanation(changeId: string): Promise<FeatureExplanation | null> {
  const endpoint = `/api/changes/${changeId}/explanation`
  logApiRequest(endpoint, { changeId })

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch explanation for change ${changeId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error fetching explanation for change ${changeId}:`, error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for explanation due to API error")
      return {
        shortDescription: "Mock explanation for debugging",
        featureContext: "Debug Context",
        technicalDetails: "This is a mock explanation for debugging purposes when the API is unavailable.",
        impact: "No real impact as this is mock data.",
        relatedChanges: [],
      }
    }

    throw error
  }
}

/**
 * Fetch unit tests for a specific file change
 */
export async function fetchUnitTests(changeId: string): Promise<UnitTest[]> {
  const endpoint = `/api/changes/${changeId}/tests`
  logApiRequest(endpoint, { changeId })

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch tests for change ${changeId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error fetching tests for change ${changeId}:`, error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for unit tests due to API error")
      return [
        {
          id: "mock-test-1",
          changeId: changeId,
          testType: "unit",
          framework: "pytest",
          description: "Mock test for debugging",
          testCode: "def test_mock():\n    assert True",
        },
      ]
    }

    throw error
  }
}

/**
 * Fetch code impacts for a specific file change
 */
export async function fetchImpacts(changeId: string): Promise<CodeImpact[]> {
  const endpoint = `/api/changes/${changeId}/impacts`
  logApiRequest(endpoint, { changeId })

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch impacts for change ${changeId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error fetching impacts for change ${changeId}:`, error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for impacts due to API error")
      return [
        {
          id: "mock-impact-1",
          changeId: changeId,
          impactedFilePath: "mock/impacted/file.js",
          impactedCode: "// Mock impacted code for debugging",
          description: "This is a mock impact for debugging purposes.",
          severity: "medium",
        },
      ]
    }

    throw error
  }
}

/**
 * Fetch deep dive analysis for a specific impact
 */
export async function fetchDeepDiveAnalysis(impactId: string): Promise<string | null> {
  const endpoint = `/api/impacts/${impactId}/deep-dive`
  logApiRequest(endpoint, { impactId })

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch deep dive analysis for impact ${impactId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data.analysis
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error fetching deep dive analysis for impact ${impactId}:`, error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for deep dive analysis due to API error")
      return "This is a mock deep dive analysis for debugging purposes when the API is unavailable."
    }

    throw error
  }
}

/**
 * Submit edge cases for a specific file change
 */
export async function submitEdgeCases(changeId: string, edgeCases: string): Promise<{ success: boolean }> {
  const endpoint = `/api/changes/${changeId}/edge-cases`
  logApiRequest(endpoint, { changeId, edgeCases })

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ edgeCases }),
    })

    if (!response.ok) {
      const error = `Failed to submit edge cases for change ${changeId}: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error(`Error submitting edge cases for change ${changeId}:`, error)

    // If we're in development mode, provide a mock response
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock response for edge cases submission due to API error")
      return { success: true }
    }

    throw error
  }
}

/**
 * Fetch test state from the backend
 */
export async function fetchTestState(): Promise<TestState> {
  const endpoint = `/api/test-state`
  logApiRequest(endpoint)

  try {
    const response = await fetchWithTimeout(endpoint)

    if (!response.ok) {
      const error = `Failed to fetch test state: ${response.statusText}`
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
    return data
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error("Error fetching test state:", error)

    // If we're in development mode, provide some mock data
    if (process.env.NODE_ENV === "development") {
      console.warn("Using mock data for test state due to API error")
      return {
        branches: {
          main: {
            status: "not_tested",
            commits: {
              "mock-commit-1": {
                status: "not_tested",
                changes: {
                  "mock-change-1": { status: "not_tested" },
                },
              },
            },
          },
        },
      }
    }

    throw error
  }
}

/**
 * Update test state on the backend
 */
export async function updateTestState(testState: TestState): Promise<void> {
  const endpoint = `/api/test-state`
  logApiRequest(endpoint, { testState })

  try {
    const response = await fetchWithTimeout(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testState),
    })

    if (!response.ok) {
      const errorData = await response.json()
      const error = errorData.error || "Failed to update test state"
      logApiResponse(endpoint, null, error)
      throw new Error(error)
    }

    const data = await response.json()
    logApiResponse(endpoint, data)
  } catch (error) {
    logApiResponse(endpoint, null, error)
    console.error("Error updating test state:", error)

    // In development mode, we'll just log the error but not throw
    if (process.env.NODE_ENV === "development") {
      console.warn("Mock success for test state update due to API error")
      return
    }

    throw error
  }
}
