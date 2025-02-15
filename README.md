<div align="center">
  <a href="https://github.com/stark81/VutronMusic" target="blank">
    <img src="buildAssets/icons/icon.png" alt="Logo" width="156" height="156">
  </a>
  <h2 style="font-weight: 600">VutronMusic</h2>
  <p>Trình phát nhạc NetEase thứ ba với giao diện đẹp</p>
</div>

[![LocalMusic][localMusic-screenShot]](https://github.com/stark81/VutronMusic)

## Giới thiệu

- Đây là dự án cá nhân của tôi, chỉ dùng cho mục đích học tập và nghiên cứu, vui lòng không sử dụng cho mục đích thương mại.
- Do tôi không quá quen thuộc với better-sqlite3, ngay cả khi các file dependency được cài đặt tự động chạy post-install, better-sqlite3 vẫn có thể không được sao chép chính xác, dẫn đến lần chạy/build đầu tiên sau khi cài đặt dependency bị lỗi. Trong trường hợp này, chỉ cần chạy lại dự án là có thể sử dụng bình thường <b>(lúc này, thư mục dist-native sẽ xuất hiện file better-sqlite3)</b>.
- Phần lớn giao diện và tính năng của dự án này tham khảo từ [YesPlayMusic](https://github.com/qier222/YesPlayMusic), thiết kế thanh điều hướng bên tham khảo từ "FangGe Music", phần thống kê thông tin top trong mục nhạc local tham khảo từ [NSMusicS](https://github.com/Super-Badmen-Viper/NSMusicS).
- Để giảm thiểu việc sử dụng bộ nhớ, dự án này sử dụng danh sách ảo để hiển thị hầu hết nội dung danh sách, bao gồm: danh sách bài hát (đơn cột, chiều cao cố định), danh sách bình luận (đơn cột, chiều cao không cố định, số lượng có thể tăng giảm), danh sách playlist và nghệ sĩ trong trang khám phá (nhiều cột, chiều cao không cố định, số lượng có thể tăng giảm), v.v. Do đó, một số danh sách có thể bị nhảy, nhấp nháy khi cuộn, những vấn đề này vẫn đang được nghiên cứu và xử lý.

## Tính năng

- ⚡️ Phát triển bằng Vue3 + TypeScript + Pinia + Fastify + Better-sqlite3
- ⚡️ Hỗ trợ nhạc local, playlist offline, đọc ảnh bìa và lời nhạc nhúng trong file nhạc local, hỗ trợ khớp thông tin trực tuyến (sử dụng API khớp, không phải API tìm kiếm)
- ⚡️ Hỗ trợ lời bài hát trên thanh trạng thái Mac, lời bài hát trên TouchBar; Trên Linux có thể hiển thị lời bài hát trên TopBar thông qua plugin [media-controls](https://github.com/stark81/media-controls)
- ⚡️ Hỗ trợ tính năng cloud drive, bình luận bài hát và nhiều tính năng khác

## Cài đặt môi trường phát triển

```bash
# Cài đặt dependencies, khuyến nghị sử dụng node21 + python3.9, các phiên bản python khác có thể gây lỗi khi cài đặt dependencies
yarn install

# Đối với người dùng Mac arm64
# Người dùng sử dụng chip Apple M series, trước khi cài đặt dependencies hãy thay đổi giá trị mac.target.arch trong file buildAssets/builder/config.js thành ['arm64'], sau đó cài đặt lại dependencies

# Chạy dự án
yarn run dev    # Chế độ phát triển
yarn run build  # Build dự án
```

## Giấy phép mã nguồn mở

Dự án này chỉ dành cho mục đích học tập và nghiên cứu cá nhân, nghiêm cấm sử dụng cho mục đích thương mại và bất hợp pháp.

Mã nguồn mở theo [Giấy phép MIT](https://opensource.org/licenses/MIT).

## Ảnh chụp màn hình

![home-screenShot][home-screenShot] ![explore-screenShot][explore-screenShot] ![library-screenShot][library-screenShot] ![likepage-screenShot][likepage-screenShot] ![local-music-screenShot][local-music-screenShot] ![playlist-screenShot][playlist-screenShot] ![playpage-screenShot][playpage-screenShot] ![comment-screenShot][comment-screenShot] ![search-screenShot][search-screenShot] ![user-screenShot][user-screenShot] ![mv-screenShot][mv-screenShot] ![tray-lyric-screenShot][tray-lyric-screenShot] ![media-controls-screenShot][media-controls-screenShot]

[localMusic-screenShot]: images/localMusic.jpg
[home-screenShot]: images/home.jpg
[explore-screenShot]: images/explore.jpg
[library-screenShot]: images/library.jpg
[likepage-screenShot]: images/like-page.jpg
[local-music-screenShot]: images/local-music.jpg
[playlist-screenShot]: images/playlists.jpg
[playpage-screenShot]: images/play-page.jpg
[comment-screenShot]: images/comment-page.jpg
[search-screenShot]: images/search-lyric.jpg
[setConvolver-screenShot]: images/setConvolver.jpg
[user-screenShot]: images/user.jpg
[tray-lyric-screenShot]: images/tray-TouchBar-lyric.jpg
[mv-screenShot]: images/mv.jpg
[media-controls-screenShot]: images/media-control-lyric.png
