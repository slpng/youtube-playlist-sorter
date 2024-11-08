import "dotenv/config"
import { parseArgs } from "node:util"
import { getPlaylistItems } from "./fetch"

const { values } = parseArgs({
  options: {
    playlistId: {
      type: "string",
      short: "p",
    },
    descending: {
      type: "boolean",
      short: "d",
    },
  },
})
const playlistId = values.playlistId
const descending = values.descending ?? false

const main = async () => {
  if (typeof playlistId !== "string") {
    throw "Insufficient arguments"
  }

  const items = await getPlaylistItems(playlistId)
  if (!items) {
    throw "Couldn't get playlist data"
  }

  items.sort((a, b) => {
    const dateA = new Date(a.snippet.publishedAt).getTime()
    const dateB = new Date(b.snippet.publishedAt).getTime()

    return (dateB - dateA) * +descending
  })

  items.forEach((item) => {
    console.log(
      `${item.snippet.publishedAt} | https://youtu.be/${item.snippet.resourceId.videoId} | ${item.snippet.title}`
    )
  })
}

try {
  main()
} catch (error: any) {
  const nodeError: NodeJS.ErrnoException = error
  console.log(nodeError)
}
