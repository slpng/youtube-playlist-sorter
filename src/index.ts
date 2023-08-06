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
    return (
      (new Date(a.snippet.publishedAt).getTime() -
        new Date(b.snippet.publishedAt).getTime()) *
      (descending && -1)
    )
  })

  items.forEach((item) => {
    console.log(
      `${item.snippet.publishedAt} | https://youtu.be/${item.snippet.resourceId.videoId} | ${item.snippet.title}`
    )
  })
}

main()
