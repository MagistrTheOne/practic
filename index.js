console.log("Hello World");

//variables
let name = "Maxon";
let age = 20;
let isProgers = true;
let x = null;
console.log(name, age, isProgers, x);
//arrays
let product = ["mackbook", "ipad", "iphone", "androids"];
console.log(product);

const salary = 10000;
const bonus = 2000;
const total = salary + bonus;
console.log(total);

document.addEventListener('DOMContentLoaded', () => {
  // Аудио элемент
  const audioPlayer = document.getElementById('audio-player');
  
  // Элементы управления воспроизведением
  const playButton = document.querySelector('.play-btn');
  const progressBar = document.querySelector('.progress');
  const progressThumb = document.querySelector('.progress-thumb');
  const volumeBar = document.querySelector('.volume-control .progress');
  const volumeThumb = document.querySelector('.volume-control .progress-thumb');
  const volumeIcon = document.querySelector('.volume-icon');
  const albumCards = document.querySelectorAll('.album-card');
  const likeButton = document.querySelector('.like-btn');
  const timeElements = document.querySelectorAll('.time');

  // Демо MP3 файлы (в реальном приложении здесь был бы API)
  const demoSongs = [
    { id: 1, title: 'Agile', artist: 'J&K', cover: '/practic/image/playlist/10.jpg', file: '/practic/audio/2.mp3' },
    { id: 2, title: 'Lover', artist: 'Taylor Swift', cover: '/practic/image/playlist/1.jpg', file: '/practic/audio/3.mp3' },
    { id: 3, title: 'Say Yes To Heaven', artist: 'Lana Del Rey', cover: '/practic/image/playlist/2.jpg', file: '/practic/audio/4.mp3' },
    { id: 5, title: 'Omnium Gatherum', artist: 'King Gizzard & The Lizard Wizard', cover: '/practic/image/playlist/4.jpg', file: '/practic/audio/5.mp3' },
    { id: 7, title: 'Starboy', artist: 'The Weeknd', cover: '/practic/image/playlist/6.jpg', file: '/practic/audio/6.mp3' },
    { id: 10, title: 'The Slow Rush', artist: 'Tame Impala', cover: '/practic/image/playlist/13.jpg', file: '/practic/audio/7.mp3' }
  ];

  // Индекс текущего трека
  let currentTrackIndex = 0;

  // Переключение между воспроизведением и паузой
  let isPlaying = false;
  
  // Сохраненное значение громкости
  let lastVolume = 0.7;
  
  // Инициализация аудиоплеера
  audioPlayer.volume = lastVolume;
  volumeBar.style.width = `${lastVolume * 100}%`;
  volumeThumb.style.left = `${lastVolume * 100}%`;

  // Установка текущего трека
  function setCurrentTrack(index) {
    currentTrackIndex = index;
    const track = demoSongs[index];
    
    audioPlayer.src = track.file;
    document.querySelector('.track-name').textContent = track.title;
    document.querySelector('.track-artist').textContent = track.artist;
    document.querySelector('.track-cover').src = track.cover;
    
    // Проверяем статус лайка для этого трека
    updateLikeButtonState();
  }

  // Функция для обновления времени
  function updateTimeDisplay() {
    const currentTime = formatTime(audioPlayer.currentTime);
    const totalTime = formatTime(audioPlayer.duration);
    
    timeElements[0].textContent = currentTime;
    timeElements[1].textContent = totalTime;
  }

  // Форматирование времени в MM:SS
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  // Обновление прогресс-бара
  function updateProgressBar() {
    if (!isNaN(audioPlayer.duration)) {
      const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${progress}%`;
      progressThumb.style.left = `${progress}%`;
    }
  }

  // Обработчик кнопки воспроизведения/паузы
  playButton.addEventListener('click', () => {
    if (audioPlayer.src) {
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
    } else if (demoSongs.length > 0) {
      // Если трек не выбран, начинаем с первого
      setCurrentTrack(0);
      audioPlayer.play();
    }
  });

  // Слушатели событий аудиоплеера
  audioPlayer.addEventListener('play', () => {
    isPlaying = true;
    playButton.innerHTML = '<i class="fas fa-pause-circle"></i>';
  });

  audioPlayer.addEventListener('pause', () => {
    isPlaying = false;
    playButton.innerHTML = '<i class="fas fa-play-circle"></i>';
  });

  audioPlayer.addEventListener('timeupdate', () => {
    updateProgressBar();
    updateTimeDisplay();
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
    updateTimeDisplay();
  });

  audioPlayer.addEventListener('ended', () => {
    // Переход к следующему треку
    const nextIndex = (currentTrackIndex + 1) % demoSongs.length;
    setCurrentTrack(nextIndex);
    audioPlayer.play();
  });

  // Активация карточек альбомов при клике
  albumCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      // Находим соответствующий трек или используем демо-данные
      const cardTitle = card.querySelector('.album-title').textContent;
      const foundTrackIndex = demoSongs.findIndex(track => 
        track.title.toLowerCase() === cardTitle.toLowerCase());
      
      const trackIndex = foundTrackIndex !== -1 ? foundTrackIndex : index % demoSongs.length;
      
      setCurrentTrack(trackIndex);
      audioPlayer.play();
    });
  });

  // Массив для отслеживания лайкнутых треков
  const likedTracks = new Set();

  // Обновляем состояние кнопки лайка
  function updateLikeButtonState() {
    const currentTrack = demoSongs[currentTrackIndex];
    if (likedTracks.has(currentTrack.id)) {
      likeButton.innerHTML = '<i class="fas fa-heart"></i>';
      likeButton.classList.add('active');
    } else {
      likeButton.innerHTML = '<i class="far fa-heart"></i>';
      likeButton.classList.remove('active');
    }
  }

  // Обработка кнопки "Нравится" с анимацией
  likeButton.addEventListener('click', () => {
    const currentTrack = demoSongs[currentTrackIndex];
    
    if (likedTracks.has(currentTrack.id)) {
      likedTracks.delete(currentTrack.id);
      likeButton.innerHTML = '<i class="far fa-heart"></i>';
      likeButton.classList.remove('active');
    } else {
      likedTracks.add(currentTrack.id);
      likeButton.innerHTML = '<i class="fas fa-heart"></i>';
      likeButton.classList.add('active');
      
      // Добавляем анимацию пульсации
      likeButton.classList.add('pulse');
      setTimeout(() => {
        likeButton.classList.remove('pulse');
      }, 500);
    }
  });

  // Перемотка трека при клике на прогресс-бар
  const progressContainer = document.querySelector('.player-controls .progress-bar');
  
  progressContainer.addEventListener('click', (e) => {
    if (audioPlayer.src) {
      const rect = progressContainer.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const percentage = clickPosition / rect.width;
      
      // Обновляем время воспроизведения
      audioPlayer.currentTime = percentage * audioPlayer.duration;
    }
  });

  // Реализация перетаскивания ползунка прогресса
  let isDraggingProgress = false;
  
  progressThumb.addEventListener('mousedown', () => {
    isDraggingProgress = true;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDraggingProgress && audioPlayer.src) {
      const rect = progressContainer.getBoundingClientRect();
      let percentage = (e.clientX - rect.left) / rect.width;
      
      // Ограничиваем значение от 0 до 1
      percentage = Math.max(0, Math.min(1, percentage));
      
      progressBar.style.width = `${percentage * 100}%`;
      progressThumb.style.left = `${percentage * 100}%`;
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (isDraggingProgress && audioPlayer.src) {
      const percentage = parseFloat(progressBar.style.width) / 100;
      audioPlayer.currentTime = percentage * audioPlayer.duration;
      isDraggingProgress = false;
    }
  });

  // Управление громкостью
  const volumeContainer = document.querySelector('.volume-control .progress-bar');
  let isDraggingVolume = false;
  
  volumeContainer.addEventListener('click', (e) => {
    if (!isDraggingVolume) {
      const rect = volumeContainer.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      setVolume(percentage);
    }
  });
  
  volumeThumb.addEventListener('mousedown', () => {
    isDraggingVolume = true;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDraggingVolume) {
      const rect = volumeContainer.getBoundingClientRect();
      let percentage = (e.clientX - rect.left) / rect.width;
      
      // Ограничиваем значение от 0 до 1
      percentage = Math.max(0, Math.min(1, percentage));
      
      setVolume(percentage);
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDraggingVolume = false;
  });
  
  // Установка громкости
  function setVolume(percentage) {
    audioPlayer.volume = percentage;
    volumeBar.style.width = `${percentage * 100}%`;
    volumeThumb.style.left = `${percentage * 100}%`;
    lastVolume = percentage;
    
    // Обновляем иконку громкости
    updateVolumeIcon(percentage);
  }
  
  // Обновление иконки громкости
  function updateVolumeIcon(volume) {
    if (volume === 0) {
      volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
      volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  }
  
  // Отключение/включение звука при клике на иконку
  volumeIcon.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {
      // Сохраняем текущую громкость и отключаем звук
      lastVolume = audioPlayer.volume;
      setVolume(0);
    } else {
      // Восстанавливаем последнюю громкость
      setVolume(lastVolume || 0.7);
    }
  });
  
  // Инициализация с первым треком
  if (demoSongs.length > 0) {
    setCurrentTrack(0);
  }
});

