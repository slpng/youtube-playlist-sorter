const API_KEY = process.env.API_KEY

interface PlaylistItem {
  kind: "youtube#playlistItem"
  etag: string
  id: string
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      [key: string]: {
        url: string
        width: number
        height: number
      }
    }
    channelTitle: string
    videoOwnerChannelTitle: string
    videoOwnerChannelId: string
    playlistId: string
    position: number
    resourceId: {
      kind: string
      videoId: string
    }
  }
}

export const getPlaylistItems = async (
  playlistId: string,
  pageToken?: string
) => {
  const searchParams = new URLSearchParams([
    ["part", "snippet"],
    ["maxResults", "50"],
    ["playlistId", playlistId],
    ["key", API_KEY],
  ])
  if (pageToken) {
    searchParams.append("pageToken", pageToken)
  }

  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?${searchParams}`

  const response = await fetch(url)
  if (!response.ok) {
    console.log(response.status, await response.json())
    return null
  }

  const data = await response.json()
  const items: PlaylistItem[] = data.items
  return items
}
