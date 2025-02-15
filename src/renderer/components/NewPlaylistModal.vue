<template>
  <BaseModal
    class="add-playlist-modal"
    :show="show"
    :title="isLocal ? $t('localMusic.playlist.newPlaylist') : $t('library.playlist.newPlaylist')"
    :close-fn="close"
    width="25vw"
  >
    <template #default>
      <input v-model="title" type="text" :placeholder="$t('library.playlist.title')" />
      <div v-show="!isLocal" class="checkbox">
        <input
          id="checkbox-private"
          v-model="isPrivate"
          type="checkbox"
          class="input"
          @input="checked = !checked"
        />
        <!-- <label for="checkbox-private">{{ $t('library.playlist.setPrivate') }}</label> -->
        <label for="checkbox-private" class="label-content">
          <div class="container" role="checkbox" :aria-checked="checked">
            <svg-icon v-if="checked" icon-class="checked" style="color: var(--color-primary)" />
            <svg-icon v-else icon-class="checkbox" />
          </div>
          <span class="label">{{ $t('library.playlist.setPrivate') }}</span>
        </label>
      </div>
    </template>
    <template #footer>
      <button class="primary block" @click="createAPlaylist">Tạo</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, toRaw } from 'vue'
import BaseModal from './BaseModal.vue'
import { useNormalStateStore } from '../store/state'
import { useLocalMusicStore } from '../store/localMusic'
import { useDataStore } from '../store/data'
import SvgIcon from './SvgIcon.vue'
import { createPlaylist, addOrRemoveTrackFromPlaylist } from '../api/playlist'
import { useI18n } from 'vue-i18n'

const stateStore = useNormalStateStore()
const { newPlaylistModal } = storeToRefs(stateStore)
const { showToast } = stateStore
const { t } = useI18n()

const { createLocalPlaylist } = useLocalMusicStore()
const { fetchLikedPlaylist } = useDataStore()

const title = ref('')
const isPrivate = ref(false)
const checked = ref(false)

const show = computed({
  get: () => newPlaylistModal.value.show,
  set: (value) => {
    newPlaylistModal.value.show = value
  }
})
const isLocal = computed({
  get: () => newPlaylistModal.value.isLocal,
  set: (value) => {
    newPlaylistModal.value.isLocal = value
  }
})
const ids = computed({
  get: () => toRaw(newPlaylistModal.value.afterCreateAddTrackID),
  set: (value) => {
    newPlaylistModal.value.afterCreateAddTrackID = value
  }
})

const close = () => {
  isLocal.value = false
  ids.value = []
  show.value = false
  title.value = ''
  isPrivate.value = false
}

const createAPlaylist = async () => {
  // Validate title
  if (!title.value.trim()) {
    showToast(t('toast.playlistNameRequired'))
    return
  }

  try {
    if (isLocal.value) {
      // Handle local playlist creation
      const imgID = ids.value.length ? ids.value[ids.value.length - 1] : 0

      const params = {
        name: title.value.trim(),
        trackIds: ids.value,
        trackCount: ids.value.length,
        coverImgUrl:
          imgID === 0
            ? 'https://p1.music.126.net/jWE3OEZUlwdz0ARvyQ9wWw==/109951165474121408.jpg?param=512y512'
            : `atom://get-playlist-pic/${imgID}`
      }

      const playlist = await createLocalPlaylist(params)
      if (!playlist) {
        throw new Error(t('toast.createLocalPlaylistFailed'))
      }

      showToast(t('toast.createLocalPlaylistSuccess'))
      close()
    } else {
      // Handle online playlist creation
      const params = {
        name: title.value.trim(),
        ...(isPrivate.value && { privacy: 10 })
      }

      const res = await createPlaylist(params)
      if (res.code !== 200) {
        throw new Error(res.message || t('toast.createPlaylistError'))
      }

      // Add tracks to playlist if needed
      if (ids.value.length > 0) {
        await addTracksToPlaylist(res.id)
      }

      await fetchLikedPlaylist()
      showToast(t('toast.createPlaylistSuccess'))
      close()
    }
  } catch (error) {
    console.error('Create playlist error:', error)
    showToast(error instanceof Error ? error.message : t('toast.createPlaylistError'))
  }
}

// Helper function to add tracks to playlist
const addTracksToPlaylist = async (playlistId: number) => {
  try {
    const data = await addOrRemoveTrackFromPlaylist({
      op: 'add',
      pid: playlistId,
      tracks: ids.value.join(',')
    })

    if (data.body.code !== 200) {
      throw new Error(data.body.message || t('toast.addTracksError'))
    }

    showToast(t('toast.savedToPlaylist'))
  } catch (error) {
    console.error('Failed to add tracks:', error)
    throw new Error(t('toast.addTracksError'))
  }
}
</script>

<style lang="scss" scoped>
.add-playlist-modal {
  .content {
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 12px;
    }
    input[type='text'] {
      // width: calc(100% - 24px);
      width: 100%;
      flex: 1;
      background: var(--color-secondary-bg-for-transparent);
      font-size: 16px;
      border: none;
      font-weight: 600;
      padding: 8px 12px;
      border-radius: 8px;
      margin-top: -1px;
      color: var(--color-text);
      &:focus {
        background: color-mix(in oklab, var(--color-primary) var(--bg-alpha), white);
        opacity: 1;
      }
      [data-theme='light'] &:focus {
        color: var(--color-primary);
      }
    }
    .checkbox {
      display: flex;
      user-select: none;
      align-items: center;
      // margin: 3px 3px 3px 4px;

      .input {
        display: none;

        &:checked {
          + .label-content {
            .container {
              &:after {
                border-color: var(--color-primary-font);
              }
            }
            .icon {
              transform: scale(1);
            }
          }
        }
      }
      .label-content {
        display: flex;
        align-items: center;

        .container {
          display: flex;
          align-items: center;
          margin-right: 4px;
        }
      }
    }
  }
}
.footer {
  padding-top: 16px;
  margin: 16px 24px 24px 24px;
  border-top: 1px solid rgba(128, 128, 128, 0.18);
  display: flex;
  justify-content: flex-start;
  margin-bottom: -8px;
  button {
    color: var(--color-text);
    background: var(--color-secondary-bg-for-transparent);
    border-radius: 8px;
    padding: 6px 16px;
    font-size: 14px;
    margin-left: 12px;
    transition: 0.2s;
    &:active {
      transform: scale(0.94);
    }
  }
  button.primary {
    color: white;
    background: var(--color-primary);
    font-weight: 500;
  }
  button.block {
    width: 100%;
    margin-left: 0;
    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
