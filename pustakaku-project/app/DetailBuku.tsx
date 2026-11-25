"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./buku.css";

const dataBuku = [
    { id: 1, judul: "Laskar Pelangi", penulis: "A. Hirata", kategori: "Novel", stok: 3, total: 5 },
    { id: 2, judul: "Bumi Manusia", penulis: "P. A. Toer", kategori: "Novel", stok: 0, total: 2 },
    { id: 3, judul: "Fisika Dasar", penulis: "Halliday", kategori: "Sains", stok: 2, total: 2 },
];

export default function DaftarBuku() {
    const [kataCari, setKataCari] = useState("");
    const [daftar, setDaftar] = useState(dataBuku);

    function cariBuku() {
        const kata = kataCari.toLowerCase();

        const hasil = dataBuku.filter(function (buku) {
            return (
                buku.judul.toLowerCase().includes(kata) ||
                buku.penulis.toLowerCase().includes(kata)
            );
        });

        setDaftar(hasil);
    }

    return (
        <div className="buku-halaman">
            {/* bagian atas: judul dan tombol tambah */}
            <div className="buku-atas">
                <h2>Daftar buku</h2>
                <Link href="/buku/tambah" className="buku-tombol-hitam">
                    + Tambah buku
                </Link>
            </div>

            {/*bagian pencarian */}
            <div className="buku-cari">
                <input
                    type="text"
                    placeholder="Cari judul atau penulis"
                    value={kataCari}
                    onChange={function (e) {
                        setKataCari(e.target.value);
                    }}
                />
                <button className="buku-tombol-hitam" onClick={cariBuku}>
                    Cari
                </button>
            </div>

            {/* tabel buku */}
            <table className="buku-tabel">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Kategori</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {daftar.map(function (buku, index) {
                        return (
                            <tr key={buku.id}>
                                <td>{index + 1}</td>
                                <td>{buku.judul}</td>
                                <td>{buku.penulis}</td>
                                <td>{buku.kategori}</td>
                                <td>
                                    {/* kalau stok 0, warnanya jadi merah */}
                                    <span className={buku.stok === 0 ? "buku-stok stok-habis" : "buku-stok"}>
                                        {buku.stok}/{buku.total}
                                    </span>
                                </td>
                                <td>
                                    <Link href={"/buku/" + buku.id} className="buku-tombol-detail">
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}

                    {daftar.length === 0 && (
                        <tr>
                            <td colSpan={6} className="buku-kosong">
                                Buku tidak ditemukan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}