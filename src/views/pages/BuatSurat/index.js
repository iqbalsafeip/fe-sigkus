import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CDataTable,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { createDataPegawai, getPegawaiById, updateDataPegawai } from 'src/redux/dataPegawaiActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import 'draft-js/dist/Draft.css'
import './Editor.css';
import { getAll } from 'src/redux/dataMasterActions';
import { createSurat } from 'src/redux/actions/surat';
import { getAll as _getAll } from 'src/redux/globalActions';



const BuatSurat = props => {
    const dispatch = useDispatch();
    const dataPegawai = useSelector(state => state.dataPegawai)
    const dataMaster = useSelector(state => state.dataMaster)
    const [modal, setModal] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
      kategori_surat_id : null,
      klasifikasi_surat_id : null,
      sifat_surat_id: null,
      status_surat_id: null,
      tipe: null,
      jenis_surat: null,
      no_agenda: '',
      no_surat: '',
      tgl_surat: '',
      tgl_terima: '',
      perihal: '',
      kepada: '',
      dari: '',
      isi_surat: '',
      file_surat: '',
      atas_nama: '',
      status: ''
    })

    const [penerima, setPenerima] = useState([])


    const submit = () => {
      if(!props.isUpdate){
        dispatch(createSurat(data, penerima)).then((res)=> {
          console.log(res);
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil menambahkan surat',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            // history.push('/data-pegawai')
          })
        })
      } else {
        // dispatch(updateDataPegawai({id: id, data: data})).then(()=> {
        //   Swal.fire({
        //     title: 'Berhasil!',
        //     text: 'berhasil mengupdate data pegawai',
        //     icon: 'success',
        //     confirmButtonText: 'Tutup'
        //   }).then(()=> {
        //     // history.push('/data-pegawai')
        //   })
        // })
      }
    }

    const tambahPenerima = data => {
      setPenerima([...penerima, data]);
      console.log(data);
      setModal(!modal)
    }

    useEffect(()=> {
      if(props.isUpdate){
        dispatch(getPegawaiById(id)).then(result => {
          setData(result.data.data)
        })
      }


      Promise.all([dispatch(getAll({ pathAPI : 'kategori_surat', actionType: 'SET_KATEGORI_SURAT' })), 
                  dispatch(getAll({ pathAPI : 'klasifikasi_surat', actionType: 'SET_KLASIFIKASI_SURAT' })), 
                  dispatch(getAll({ pathAPI : 'sifat_surat', actionType: 'SET_SIFAT_SURAT' })),
                  dispatch(getAll({ pathAPI : 'status_surat', actionType: 'SET_STATUS_SURAT' }))])
    },[])

    return (
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              {props.isUpdate ? 'Update' : 'Buat'} Surat
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Kategori Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.kategori_surat_id} onChange={e => setData({...data,kategori_surat_id: e.target.value})}>
                        <option value="">--Pilih Kategori Surat--</option>
                        {
                          dataMaster.kategori_surat.map((d,i)=> <option value={d.id}>{d.kategori}</option>)
                        }
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Klasifikasi Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.klasifikasi_surat_id} onChange={e => setData({...data,klasifikasi_surat_id: e.target.value})}>
                        <option value="">--Pilih Klasifikasi Surat--</option>
                        {
                          dataMaster.klasifikasi_surat.map((d,i)=> <option value={d.id}>{d.klasifikasi}</option>)
                        }
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Sifat Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.sifat_surat_id} onChange={e => setData({...data,sifat_surat_id: e.target.value})}>
                        <option value="">--Pilih Sifat Surat--</option>
                        {
                          dataMaster.sifat_surat.map((d,i)=> <option value={d.id}>{d.sifat}</option>)
                        }
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Status Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.status_surat_id} onChange={e => setData({...data,status_surat_id: e.target.value})}>
                        <option value="">--Pilih Status Surat--</option>
                        {
                          dataMaster.status_surat.map((d,i)=> <option value={d.id}>{d.status}</option>)
                        }
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Tipe Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.tipe} onChange={e => setData({...data,tipe: e.target.value})}>
                        <option value="">--Pilih Tipe Surat--</option>
                        <option value={0}>Surat Masuk</option>
                        <option value={1}>Surat Keluar</option>
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                    <CCol xs="4">
                    <CFormGroup>
                        <CLabel htmlFor="jenis_kelamin">Jenis Surat</CLabel>
                        <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.jenis_surat} onChange={e => setData({...data,jenis_surat: e.target.value})}>
                        <option value="">--Pilih Jenis Surat--</option>
                        <option value={0}>Internal</option>
                        <option value={1}>Eksternal</option>
                        </CSelect>
                    </CFormGroup>
                    </CCol>
                </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">No Agenda</CLabel>
                    <CInput id="namalengkap" value={data.no_agenda} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, no_agenda: e.target.value})} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">No Surat</CLabel>
                    <CInput id="namalengkap" value={data.no_surat} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, no_surat: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Tanggal Surat</CLabel>
                    <CInput id="namalengkap" value={data.tgl_surat} placeholder="Masukan Nama Lengkap" type="date" required onChange={e => setData({...data, tgl_surat: e.target.value})} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Tanggal Terima</CLabel>
                    <CInput id="namalengkap" value={data.tgl_terima} placeholder="Masukan Nama Lengkap" type="date" required onChange={e => setData({...data, tgl_terima: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Perihal</CLabel>
                    <CInput id="namalengkap" value={data.perihal} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, perihal: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Kepada</CLabel>
                    <CInput id="namalengkap" value={data.kepada} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, kepada: e.target.value})} />
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Dari</CLabel>
                    <CInput id="namalengkap" value={data.dari} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, dari: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                    <CFormGroup>
                        <CLabel htmlFor="namalengkap">Isi Surat</CLabel>
                        <CTextarea value={data.isi_surat} onChange={e => setData({...data, isi_surat: e.target.value})} placeholder="isi surat..." ></CTextarea>
                    </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="6">
                  <CFormGroup>
                    <CLabel htmlFor="filettd">File Surat</CLabel>
                    <CInput id="filettd" type="file" required  accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"  onChange={e => setData({...data,file_surat: e.target.files[0]})}/>
                  </CFormGroup>
                </CCol>
                <CCol xs="6">
                    <CFormGroup>
                        <CLabel htmlFor="namalengkap">Atas Nama</CLabel>
                        <CInput id="namalengkap" value={data.atas_nama} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, atas_nama: e.target.value})} />
                    </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CCard>
                    <CCardHeader>
                      Penerima
                      <div className="card-header-actions">
                          <CButton color="primary" onClick={()=> setModal(!modal)}>
                            Tambah Penerima
                          </CButton>
                      </div>
                    </CCardHeader>
                    <CCardBody>
                      {!penerima.length > 0 ? (
                        <p>Tidak Ada Penerima</p>
                      ): (
                        <CDataTable 
                          fields={['no', 'unit_kerja', 'jabatan', 'aksi']} 
                          items={penerima} 
                          scopedSlots={{
                            'no' :(item, index)=> (
                              <td>
                                {index+1}
                              </td>
                            ),
                            'unit_kerja' :(item, index)=> (
                              <td>
                                {item.penerima.tbl_unit_kerja.nama}
                              </td>
                            ),
                            'jabatan' :(item, index)=> (
                              <td>
                                {item.penerima.tbl_jabatan.jabatan}
                              </td>
                            ),
                            'aksi' :(item, index)=> (
                              <td>
                                <CButton color="danger" onClick={()=> setPenerima(penerima.filter((d)=> d.penerima.id != item.penerima.id))} >
                                  Hapus
                                </CButton>
                              </td>
                            ),
                          }}
                          />
                      )}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
              <CButton color="primary" onClick={submit} disabled={dataPegawai.is_loading} >
                {props.isUpdate ? 'Update' : 'Buat'}
              </CButton>
            </CCardBody>
          </CCard>

          <BuatSurat.Modal modal={modal} setModal={e => setModal(!modal)} onClick={tambahPenerima} />
        </CCol>
    )
}

const Modal = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [unitKerja, setUnitKerja] = useState([])
  const [jabatanUnitKerja, setJabatanUnitKerja] = useState([])
  const [data, setData ] = useState({
      id_unit_kerja_jabatan: null,
      penerima: {}
  })


  const onChange = (e) => {
      setIsLoading(true)
      dispatch(_getAll({ pathAPI : 'mapping-unit-kerja/' + e.target.value})).then((res)=>{
          setJabatanUnitKerja(res.data.data)
          setIsLoading(false)
      }).catch(err => {
          setIsLoading(false)
      })
  }


  const setPenerima = async id => {
    const data = await {
      id_unit_kerja_jabatan: id,
      penerima: jabatanUnitKerja.filter(d => d.id === parseInt(id))[0]
    }
    console.log(data);
    setData(data)
  }

  useEffect(()=>{
      setIsLoading(true)
      dispatch(_getAll({ pathAPI : 'unit_kerja'})).then((res)=>{
          setUnitKerja(res.data.data)
          setIsLoading(false)
      }).catch(err => {
          setIsLoading(false)
      })
  },[])

  return (
      <>
      <CModal
          show={props.modal}
          onClose={props.setModal}
          >
          <CModalHeader closeButton>
            Tambah Penerima
          </CModalHeader>
          <CModalBody>
              <CFormGroup>
                  <CLabel>Unit Kerja</CLabel>
                  <CSelect custom id="is_active"   onChange={onChange} >
                      <option value={null}>--Pilih Unit Kerja--</option>
                      {
                          unitKerja.map((data)=> (
                              <option value={data.id}  >{data.nama}</option>
                          ))
                      }
                  </CSelect>
              </CFormGroup>
          </CModalBody>
          <CModalBody>
              <CFormGroup>
                  <CLabel>Jabatan Unit Kerja</CLabel>
                  <CSelect custom id="is_active"  value={data.id_unit_kerja_jabatan} onChange={e => setPenerima(e.target.value)} disabled={isLoading} >
                      <option value={null}>--Pilih Jabatan--</option>
                      {
                          jabatanUnitKerja && jabatanUnitKerja.map((data)=> (
                              <option value={data.id}  >{data.tbl_jabatan.jabatan}</option>
                          ))
                      }
                  </CSelect>
              </CFormGroup>
          </CModalBody>
          <CModalFooter>
              <CButton color="primary" onClick={e => props.onClick(data)} > Tambah</CButton>{' '}
              <CButton
                  color="secondary"
                  onClick={props.setModal}
              >Cancel</CButton>
          </CModalFooter>
      </CModal>
      </>
  )
}

BuatSurat.Modal = props => <Modal {...props} />

export default BuatSurat;