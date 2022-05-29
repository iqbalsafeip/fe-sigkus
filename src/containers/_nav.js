import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Agenda Surat",
    route: "/agenda-surat",
    icon: (
      <CIcon name="cil-envelope-closed" customClasses="c-sidebar-nav-icon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Buat Surat",
        to: "/surat/buat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Surat Masuk",
        to: "/surat-masuk",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Surat Keluar",
        to: "/surat-keluar",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Organisasi",
    icon: "cil-people",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Unit Kerja",
        to: "/unit-kerja",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Jabatan",
        to: "/jabatan",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Data Pegawai",
        to: "/data-pegawai",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Mapping Unit Kerja",
        to: "/mapping-unit-kerja",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Data Master",
    route: "/data-master",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Kategori Surat",
        to: "/kategori-surat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sifat Surat",
        to: "/sifat-surat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Klasifikasi Surat",
        to: "/klasifikasi-surat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Status Surat",
        to: "/status-surat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tindakan Disposisi",
        to: "/tindakan-disposisi",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Klasifikasi Disposisi",
        to: "/klasifikasi-disposisi",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pengaturan",
    route: "/pengaturan",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "User",
        to: "/users",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Role",
        to: "/role",
      },
    ],
  },
];

export const staffNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Data Main",
    route: "/agenda-surat",
    icon: (
      <CIcon name="cil-envelope-closed" customClasses="c-sidebar-nav-icon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Problem Data",
        to: "/surat/buat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Managing Report",
        to: "/surat-masuk",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Data Handling",
        to: "/surat-keluar",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Data Master",
    route: "/data-master",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Pertanyaan",
        to: "/pertanyaan",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "User",
    icon: "cil-settings",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Data Customers",
        to: "/customers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Data Technicians",
        to: "/technicians",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Data Chiefs",
        to: "/chiefs",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Data Staff",
        to: "/staffs",
      },
    ],
  },
  ,
  {
    _tag: "CSidebarNavItem",
    name: "Lihat Peta Permasalahan",
    icon: "cil-people",
    route: "/peta-permasalahan",
    to: "/peta-permasalahan",
  },
];

export const customerNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pelayanan",
    route: "/agenda-surat",
    icon: (
      <CIcon name="cil-envelope-closed" customClasses="c-sidebar-nav-icon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Laporkan Masalah",
        to: "/laporan/buat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Laporan Saya",
        to: "/surat-masuk",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Lihat Peta Permasalahan",
    icon: "cil-people",
    route: "/peta-permasalahan",
    to: "/peta-permasalahan",
  },
];

export default _nav;
