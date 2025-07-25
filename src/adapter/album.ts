import { album } from '$api'
import type { Album, Song, SongData } from '$define'
import { BaseAdapter } from './base'

export class AlbumAdapter extends BaseAdapter {
  private detail: { album: Album; songs: SongData[] } | undefined
  private async fetchDetail() {
    if (this.detail) return
    this.detail = await album(this.id)
  }

  override async getTitle() {
    await this.fetchDetail()
    return this.detail!.album.name
  }

  override async getCover() {
    await this.fetchDetail()
    return this.detail!.album.picUrl
  }

  override async getSongs(quality: number): Promise<Song[]> {
    await this.fetchDetail()
    const { all: songDatas } = await this.filterSongs(this.detail!.songs, quality)
    return this.getSongsFromData(songDatas)
  }
}
