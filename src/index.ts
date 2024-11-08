import "dotenv/config"
import { parseArgs } from "node:util"
import { getPlaylistItems } from "./fetch"

const {
  values: { playlistId, descending },
} = parseArgs({
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

const main = async () => {
  const items = await getPlaylistItems(playlistId)

  if (!items) {
    console.log('main null')
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

main()
