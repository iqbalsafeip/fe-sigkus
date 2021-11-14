import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CHeader, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs,CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CFormGroup,
    CLabel,
    CInput,
    CSelect,
    CSpinner, 
    } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createUser, updateData } from 'src/redux/actions';
import { createData, getAll } from 'src/redux/globalActions';
import { getPegawaiById, getUserByPegawai } from 'src/redux/dataPegawaiActions';



const Details = props => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        nip: '',
        nama: '',
        jenis_kelamin: '',
        tempat_lahir: '',
        tgl_lahir: '',
        no_telp: '',
        email: '',
        alamat: '',
        ttd_file: '',
        photo_file: ''
    });
    const [user, setUser] = useState({})
    const [jabatan, setJabatan] = useState({})

    const getUser = () => {
        dispatch(getUserByPegawai(id)).then((result)=> {
            setUser(result.data.data)
        }).catch(err => {
            if(err.response.status === 404){
                setUser({})
            }
        })
    }

    const getJabatan = (jabatan) => {
        dispatch(getAll({ pathAPI : 'mapping-unit-kerja/' + jabatan.id_unit_kerja_jabatan + '?pegawai=1'})).then((res)=>{
            console.log(res.data.data);
            setJabatan(res.data.data[0])
        }).catch(err => {
        })
    }

    useEffect(()=> {
        dispatch(getPegawaiById(id)).then((result)=>{
            setData(result.data.data)
        })
        dispatch(getAll({ pathAPI : 'data-jabatan/' + id})).then((res)=>{
            getJabatan(res.data.data)
        }).catch(err => {
        })
        getUser();
    }, [])
    return (
        <CRow>
        <CCol xs="12" md="6" lg="4" >
            <CCard >
                <CCardHeader>
                    Details Profile Pegawai
                    
                </CCardHeader>
                <CCardBody>
                    <CRow className="justify-content-center align-items-center">
                        <Details.Avatar photo_file={data.photo_file} />
                    </CRow>

                    <CRow className="justify-content-center align-items-center mt-3">
                        <h5>
                            {data.nama}
                        </h5>
                    </CRow>
                    <CCol className="px-3 mt-2">
                        <Details.Item iconName="cil-envelope-closed" data={data.email} />
                        <Details.Item iconName="cil-phone" data={data.no_telp} />
                        <Details.Item iconName="cil-location-pin" data={data.alamat} />
                    </CCol>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol xs="12" md="6" lg="8" >
            <CCard>
            <CCardHeader>
                <div className='card-header-actions'>
                    <Link className="btn btn-primary btn-sm" to={`data-pegawai/update/${id}`}  >
                        Update
                    </Link>
                    <CButton size='sm' color="danger" className="ml-1" >
                        Delete
                    </CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                <CTabs>
                <CNav variant="tabs">
                    <CNavItem>
                    <CNavLink>
                        Detail Pegawai
                    </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CNavLink>
                        Jabatan
                    </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CNavLink>
                        User
                    </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>Nama Lengkap</td>
                                <td>{data.nama}</td>
                            </tr>
                            <tr>
                                <td>NIP</td>
                                <td>{data.nip}</td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td>{data.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-Laki' }</td>
                            </tr>
                            <tr>
                                <td>Tempat Lahir</td>
                                <td>{data.tempat_lahir}</td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td>{data.tgl_lahir}</td>
                            </tr>
                            <tr>
                                <td>Nomor Telpon</td>
                                <td>{data.no_telp}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>{data.alamat}</td>
                            </tr>
                            <tr>
                                <td>File TTD</td>
                                <td>
                                    <CButton color="primary" size='sm' >
                                        Lihat
                                    </CButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </CTabPane>
                    <CTabPane>
                        <Details.JabatanPane jabatan={jabatan} getJabatan={getJabatan}  />
                    </CTabPane>
                    <CTabPane>
                        <Details.UserPane user={user} setuser={setUser} getUser={getUser} pegawai={data} />
                    </CTabPane>
                </CTabContent>
                </CTabs>
            </CCardBody>
            </CCard>
        </CCol>
        </CRow>
    )
}

Details.Avatar = props => (
    <div style={{
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundImage: `url("http://localhost:8080/public/photo_file/${props.photo_file}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }} >
    </div>
)

Details.Item = props => (
    <CRow >
        <CIcon name={props.iconName} size={'lg'} />
        <p className="ml-2">{props.data}</p>
    </CRow>
)


Details.UserPane = props => {
    if(!props.user.username){
        return (
            <>
                <CAlert color="info" className="mt-2"  >Tidak terdapat User Pegawai </CAlert>
                <Details.FormUser setuser={props.setuser} getUser={props.getUser} pegawai={props.pegawai} />
            </>          
        )
    } else {
        return (
            <>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{props.user.username}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{props.user.is_active == 1  ? 'Aktif' : 'Tidak Aktif' }</td>
                        </tr>
                    </tbody>
                </table> 
                <Details.FormUser isUpdate={true} user={props.user} setuser={props.setuser} getUser={props.getUser} pegawai={props.pegawai}/>
            </>
        )
    }
    
}

Details.JabatanPane = props => {
    if(!props.jabatan.tbl_jabatan){
        return (
            <>
                <CAlert color="info" className="mt-2"  >Tidat terdapat data jabatan</CAlert>
                <Details.FormJabatan  getJabatan={props.getJabatan} />
            </>          
        )
    } else {
        return (
            <>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Unit Kerja</td>
                            <td>{props.jabatan.tbl_unit_kerja.nama}</td>
                        </tr>
                        <tr>
                            <td>Jabatan</td>
                            <td>{props.jabatan.tbl_jabatan.jabatan}</td>
                        </tr>
                    </tbody>
                </table> 
                <Details.FormJabatan isUpdate={true} getJabatan={props.getJabatan} />
            </>
        )
    }
    
}

const FormUser = props => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [modal, setModal ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData ] = useState({
        username : '',
        password: '',
        is_active: 0,
        pegawai_id: id
    })

    const submit = () => {
        console.log(data);
        setIsLoading(true)
        if(props.isUpdate){
            dispatch(updateData({id: props.user.id, data: data})).then(result =>{
                props.setuser({...props.user, ...result.data.data})
                setModal(false);
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                setModal(false);
            })
        } else {
            
            dispatch(createUser(data)).then((result)=>{

                setModal(false);
                props.getUser()
                setIsLoading(false)
            }).catch(err => {
                setModal(false);
                setIsLoading(false)
            })
        }
    }

   

    useEffect(()=>{
        if(props.user){
            setData(props.user)
        }
    },[props.user])

    return (
        <>
        <CButton color="success" size="sm" onClick={()=> setModal(!modal)} >Update Data User</CButton>
        <CModal
            show={modal}
            onClose={()=> setModal(!modal)}
            >
            <CModalHeader closeButton>Update Data User</CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel htmlFor="nf-nama">Username</CLabel>
                    <CInput
                        type="text"
                        value={data.username}
                        onChange={e => setData({...data, username : e.target.value})}
                        id="nf-nama"
                        name="nf-nama"
                        placeholder="Masukan Username..."
                        required
                    />
                    <CButton size="sm" className="mt-2" color="primary" onClick={e=> setData({...data, username: props.pegawai.nip})} >
                        Gunakan NIP
                    </CButton>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-nama">Password</CLabel>
                    <CInput
                        type="password"
                        value={data.password}
                        onChange={e => setData({...data, password: e.target.value})}
                        id="nf-nama"
                        name="nf-nama"
                        placeholder="Masukan password..."
                        required
                    />
                </CFormGroup>
                <CFormGroup>
                    <CLabel>Status</CLabel>
                    <CSelect custom id="is_active" onChange={e => setData({...data, is_active : e.target.value})} value={data.is_active} >
                        <option value={0}  >Tidak Aktif</option>
                        <option value={1}  >Aktif</option>
                    </CSelect>
                </CFormGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={submit} disabled={isLoading} > {isLoading ? <CSpinner size='sm' /> : null} {props.isUpdate ? 'Update' : 'Tambah'}</CButton>{' '}
                <CButton
                    color="secondary"
                    onClick={()=> setModal(!modal)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

Details.FormUser = (props) =>  <FormUser {...props} />

const FormJabatan = props => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [modal, setModal ] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [unitKerja, setUnitKerja] = useState([])
    const [jabatanUnitKerja, setJabatanUnitKerja] = useState([])
    const [data, setData ] = useState({
        id_unit_kerja_jabatan: null,
        id_pegawai: id
    })

    const submit = () => {
        console.log(data);
        setIsLoading(true)
        if(props.isUpdate){
            dispatch(updateData({id: props.user.id, data: data})).then(result =>{
                props.setuser({...props.user, ...result.data.data})
                setModal(false);
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                setModal(false);
            })
        } else {
            dispatch(createData({pathAPI: 'data-jabatan', data: data})).then(res => {
                props.getJabatan(res.data.data)
                setIsLoading(false)
                setModal(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false)
                setModal(false);
            })
        }
    }

    const onChange = (e) => {
        setIsLoading(true)
        dispatch(getAll({ pathAPI : 'mapping-unit-kerja/' + e.target.value})).then((res)=>{
            setJabatanUnitKerja(res.data.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        setIsLoading(true)
        dispatch(getAll({ pathAPI : 'unit_kerja'})).then((res)=>{
            setUnitKerja(res.data.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
        })
    },[])

    return (
        <>
        <CButton color="success" size="sm" onClick={()=> setModal(!modal)} >Update Data Jabatan</CButton>
        <CModal
            show={modal}
            onClose={()=> setModal(!modal)}
            >
            <CModalHeader closeButton>Update Data User</CModalHeader>
            <CModalBody>
                <CFormGroup>
                    <CLabel>Unit Kerja</CLabel>
                    <CSelect custom id="is_active"  value={data.is_active} onChange={onChange} >
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
                    <CSelect custom id="is_active"  value={data.id_unit_kerja_jabatan} onChange={e => setData({...data, id_unit_kerja_jabatan: e.target.value})} disabled={isLoading} >
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
                <CButton color="primary" onClick={submit} disabled={isLoading} > {isLoading ? <CSpinner size='sm' /> : null} {props.isUpdate ? 'Update' : 'Tambah'}</CButton>{' '}
                <CButton
                    color="secondary"
                    onClick={()=> setModal(!modal)}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
        </>
    )
}

Details.FormJabatan = (props) =>  <FormJabatan {...props} />

export default Details