export const splitSoundtrackAlbumTitle = (title: string) => {
  const keywords = [
    'Music from the Original Motion Picture Score',
    'The Original Motion Picture Soundtrack',
    'Original MGM Motion Picture Soundtrack',
    'Complete Original Motion Picture Score',
    'Original Music From The Motion Picture',
    'Music From The Disney+ Original Movie',
    'Original Music From The Netflix Film',
    'Original Score to the Motion Picture',
    'Original Motion Picture Soundtrack',
    'Soundtrack from the Motion Picture',
    'Original Television Soundtrack',
    'Original Motion Picture Score',
    'Music From the Motion Picture',
    'Music From The Motion Picture',
    'Complete Motion Picture Score',
    'Music from the Motion Picture',
    'Original Videogame Soundtrack',
    'La Bande Originale du Film',
    'Music from the Miniseries',
    'Bande Originale du Film',
    'Die Original Filmmusik',
    'Original Soundtrack',
    'Complete Score',
    'Original Score'
  ]
  for (const keyword of keywords) {
    if (title.includes(keyword) === false) continue
    return {
      title: title
        .replace(`(${keyword})`, '')
        .replace(`: ${keyword}`, '')
        .replace(`[${keyword}]`, '')
        .replace(`- ${keyword}`, '')
        .replace(`${keyword}`, ''),
      subtitle: keyword
    }
  }
  return { title, subtitle: '' }
}

export const splitAlbumTitle = (title: string) => {
  const keywords = [
    'Bonus Tracks Edition',
    'Complete Edition',
    'Deluxe Edition',
    'Deluxe Version',
    'Tour Edition'
  ]
  for (const keyword of keywords) {
    if (title.includes(keyword) === false) continue
    return {
      title: title
        .replace(`(${keyword})`, '')
        .replace(`: ${keyword}`, '')
        .replace(`[${keyword}]`, '')
        .replace(`- ${keyword}`, '')
        .replace(`${keyword}`, ''),
      subtitle: keyword
    }
  }
  return { title, subtitle: '' }
}

export const playlistCategories = [
  {
    name: 'Tất cả',
    enable: true,
    bigCat: 'static'
  },
  {
    name: 'Danh sách đề xuất',
    enable: true,
    bigCat: 'static'
  },
  {
    name: 'Danh sách chất lượng',
    enable: true,
    bigCat: 'static'
  },
  {
    name: 'Chính thức',
    enable: true,
    bigCat: 'static'
  },
  {
    name: 'Tiếng Hoa',
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Âu Mỹ',
    enable: true,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Nhật',
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Hàn',
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Quảng',
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Pop',
    enable: true,
    bigCat: 'Thể loại'
  },
  {
    name: 'Rock',
    enable: true,
    bigCat: 'Thể loại'
  },
  {
    name: 'Dân ca',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Electronic',
    enable: true,
    bigCat: 'Thể loại'
  },
  {
    name: 'Dance',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Rap',
    enable: true,
    bigCat: 'Thể loại'
  },
  {
    name: 'Nhạc nhẹ',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Jazz',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Country',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'R&B/Soul',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Cổ điển',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Dân tộc',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'British',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Metal',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Punk',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Blues',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Reggae',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'World Music',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Latin',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'New Age',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Cổ phong',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Post-rock',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Bossa Nova',
    enable: false,
    bigCat: 'Thể loại'
  },
  {
    name: 'Buổi sáng',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Đêm khuya',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Học tập',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Làm việc',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Nghỉ trưa',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Trà chiều',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Tàu điện ngầm',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Lái xe',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Thể thao',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Du lịch',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Đi dạo',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Quán bar',
    enable: false,
    bigCat: 'Tình huống'
  },
  {
    name: 'Hoài niệm',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Trong sáng',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Lãng mạn',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Buồn',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Chữa lành',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Thư giãn',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Cô đơn',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Xúc động',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Phấn khích',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Vui vẻ',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Yên tĩnh',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Nhớ nhung',
    enable: false,
    bigCat: 'Cảm xúc'
  },
  {
    name: 'Giải trí',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Nhạc phim',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'ACG',
    enable: true,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Thiếu nhi',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Học đường',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Game',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Thế hệ 70',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Thế hệ 80',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Thế hệ 90',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Nhạc mạng',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'KTV',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Kinh điển',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Cover',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Guitar',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Piano',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Nhạc cụ',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Xếp hạng',
    enable: false,
    bigCat: 'Chủ đề'
  },
  {
    name: 'Thế hệ 2000',
    enable: false,
    bigCat: 'Chủ đề'
  }
]

export const artistCategories = [
  {
    name: 'Tất cả',
    code: -1,
    enable: true,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Hoa',
    code: 7,
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Âu Mỹ',
    code: 96,
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Nhật',
    code: 8,
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tiếng Hàn',
    code: 16,
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Khác',
    code: 0,
    enable: false,
    bigCat: 'Ngôn ngữ'
  },
  {
    name: 'Tất cả',
    code: -1,
    enable: true,
    bigCat: 'Phân loại'
  },
  {
    name: 'Ca sĩ nam',
    code: 1,
    enable: false,
    bigCat: 'Phân loại'
  },
  {
    name: 'Ca sĩ nữ',
    code: 2,
    enable: false,
    bigCat: 'Phân loại'
  },
  {
    name: 'Nhóm nhạc',
    code: 3,
    enable: false,
    bigCat: 'Phân loại'
  },
  {
    name: 'Phổ biến',
    code: -1,
    enable: true,
    bigCat: 'Lọc'
  },
  {
    name: '#',
    code: 0,
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'A',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'B',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'C',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'D',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'E',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'F',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'G',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'H',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'I',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'J',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'K',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'L',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'M',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'N',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'O',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'P',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'Q',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'R',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'S',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'T',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'U',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'V',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'W',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'X',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'Y',
    enable: false,
    bigCat: 'Lọc'
  },
  {
    name: 'Z',
    enable: false,
    bigCat: 'Lọc'
  }
]
