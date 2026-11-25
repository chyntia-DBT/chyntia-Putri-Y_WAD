"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./baru.css";

type Buku = {
    id: number;
    judul: string;
    penulis: string;
    kategori: string;
    tahun: number;
    stok: number;
    total: number;
    deskripsi: string;
};

const dataBuku: Buku[] = [];

export default function TambahBuku() {
    const router = useRouter();

    const [judul, setJudul] = useState("");
    const [penulis, setPenulis] = useState("");
    const [kategori, setKategori] = useState("");
    const [tahun, setTahun] = useState("");
    const [stok, setStok] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

    const [error, setError] = useState({
        judul: "",
        penulis: "",
        kategori: "",
        stok: "",
    });

    function simpan(e: React.FormEvent) {
        e.preventDefault();

        const errorBaru = {
            judul: judul === "" ? "Judul wajib diisi" : "",
            penulis: penulis === "" ? "Penulis wajib diisi" : "",
            kategori: kategori === "" ? "Kategori wajib dipilih" : "",
            stok: stok === "" ? "Jumlah stok wajib diisi" : "",
        };
        setError(errorBaru);

        if (errorBaru.judul || errorBaru.penulis || errorBaru.kategori || errorBaru.stok) {
            return;
        }

        const idBaru = dataBuku.length + 1;

        dataBuku.push({
            id: idBaru,
            judul: judul,
            penulis: penulis,
            kategori: kategori,
            tahun: Number(tahun) || 0,
            stok: Number(stok),
            total: Number(stok),
            deskripsi: deskripsi,
        });

        router.push("/buku");
    }

    return (
        <div className="baru-halaman">
            <form className="baru-kartu" onSubmit={simpan}>
                <h2>Tambah buku baru</h2>

                {/* Judul */}
                <label>Judul *</label>
                <input
                    type="text"
                    placeholder="Judul buku"
                    value={judul}
                    onChange={function (e) {
                        setJudul(e.target.value);
                    }}
                />
                {error.judul && <p className="baru-error">{error.judul}</p>}

                {/* Penulis */}
                <label>Penulis *</label>
                <input
                    type="text"
                    placeholder="Nama penulis"
                    value={penulis}
                    onChange={function (e) {
                        setPenulis(e.target.value);
                    }}
                />
                {error.penulis && <p className="baru-error">{error.penulis}</p>}

                {/* Kategori */}
                <label>Kategori *</label>
                <select
                    value={kategori}
                    onChange={function (e) {
                        setKategori(e.target.value);
                    }}
                >
                    <option value="">Pilih kategori</option>
                    <option value="Novel">Novel</option>
                    <option value="Sains">Sains</option>
                    <option value="Sejarah">Sejarah</option>
                    <option value="Pelajaran">Pelajaran</option>
                </select>
                {error.kategori && <p className="baru-error">{error.kategori}</p>}

                {/* Tahun dan stok sebaris */}
                <div className="baru-baris">
                    <div>
                        <label>Tahun terbit</label>
                        <input
                            type="number"
                            placeholder="2005"
                            value={tahun}
                            onChange={function (e) {
                                setTahun(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label>Jumlah stok *</label>
                        <input
                            type="number"
                            placeholder="5"
                            value={stok}
                            onChange={function (e) {
                                setStok(e.target.value);
                            }}
                        />
                        {error.stok && <p className="baru-error">{error.stok}</p>}
                    </div>
                </div>

                {/* Deskripsi */}
                <label>Deskripsi</label>
                <textarea
                    placeholder="Deskripsi buku"
                    value={deskripsi}
                    onChange={function (e) {
                        setDeskripsi(e.target.value);
                    }}
                ></textarea>

                {/* Tombol */}
                <div className="baru-tombol">
                    <Link href="/buku" className="baru-batal">Batal</Link>
                    <button type="submit" className="baru-simpan">Simpan</button>
                </div>
            </form>
        </div>
    );
}
