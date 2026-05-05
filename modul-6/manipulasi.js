const judul = document.getElementById('judul')
const info  = document.getElementById('info')
const foto  = document.getElementById('foto') 
const kotak  = document.getElementById('kotak') 
const btnUbah  = document.getElementById('btn-ubah') 
const btnToggle  = document.getElementById('btn-toggle')

btnUbah.addEventListener ('click',() => {
    judul.textContent = 'Judul sudah Diubah!'

    //menyisipkan HTML
    info.innerHTML ='teks <strong>tebal</strong> dan <em>miring</em>.'

    //mengubah atribut gambar
    foto.setAttribute('src', 'https://picsum..photos/100/100?random=2')
    foto.setAttribute('alt','Foto baru')

    //langsunng mengubah style
    kotak.style.backgroundColor= '#fef9e7'
    kotak.style.padding = '12px'
    kotak.style.borderRadius = '8px'
})

btnToggle.addEventListener('click', () => {
    kotak.classList.toggle('aktif')

    //mengecek class ada atau tidak
    const adaAktif = kotak.classList.contains('aktif')
    btnTonggle. textContent = adaAktif ? 'Nonaktifkan' : 'Aktifkan'
})