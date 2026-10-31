import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import mahasiswa from '../../mahasiswa.json'
import './Beranda.css'

export default function Beranda() {
  const { items, loading } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size

  return (
    <section className='beranda'>
      <div className='kotak kotak-judul'>
      <h1>RuangRakit</h1>
      <p>Tema: {mahasiswa.tema}</p>
      </div>

      {loading ? (
        <div className='kotak'>
        <p>Aplikasi yang memuat kumpulan proyek portofolio.</p>
        </div>
      ) : (
        <div className='beranda-grid'>
          <div className='kotak kotak-angka'>
            <strong>{items.length}</strong>
            <span>Proyek</span>
          </div>
          <div className='kotak kotak-angka'>
            <strong>{jumlahKategori}</strong>
            <span>Kategori</span>
          </div>
        </div>
      )}

      <div className='kotak kotak-aksi'>
      <Link to="/koleksi" className='beranda-tombol'>Lihat Semua Koleksi</Link>
      </div>
    </section>
  )
}