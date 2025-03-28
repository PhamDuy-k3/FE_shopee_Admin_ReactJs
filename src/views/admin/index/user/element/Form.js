import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Form({ title, isUpdate = false }) {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [statusCode, setsStatusCode] = useState();
  const urlUpdate = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    // giá trị mặc định cho data
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      level: "2",
      gender: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (isUpdate) {
      fetch(`http://localhost:5050/users/${urlUpdate.userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.admin_token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setValue("name", res.data.name);
          setValue("email", res.data.email);
          setValue("phone", res.data.phone);
          setValue("level", res.data.level.toString());
        });
    }
  }, [isUpdate, urlUpdate]);

  const urlApiCreatUser = "http://localhost:5050/users/";

  const urlApiUpdateUser = `http://localhost:5050/users/${urlUpdate.userId}`;

  const CreatUpdateuser = (data, method, urlApi, success, error) => {
    const formData = new FormData();
    if (data.name) {
      formData.append("name", data.name);
    }
    if (data.email) {
      formData.append("email", data.email);
    }
    if (data.phone) {
      formData.append("phone", data.phone);
    }
    if (data.password) {
      formData.append("password", data.password);
    }
    if (data.level) {
      formData.append("level", data.level);
    }
    if (data.gender) {
      formData.append("gender", data.gender);
    }
    if (data.birthday) {
      formData.append("birthday", data.birthday);
    }
    if (data.address) {
      formData.append("address", data.address);
    }
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }
    formData.append("isVerified", true);

    // Chú ý: data.avatar là một mảng, chúng ta cần lấy phần tử đầu tiên
    console.log(formData);
    fetch(urlApi, {
      method: method,
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + cookies.admin_token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status_code === 200) {
          setsStatusCode(res.status_code);
          toast.success(() => <p style={{ paddingTop: "1rem" }}>{success}</p>);
        } else {
          // Xử lý các lỗi nếu có
          toast.error(() => <p style={{ paddingTop: "1rem" }}>{error}</p>);
        }
      });
  };
  //Thêm user
  const createUser = (data) => {
    // console.log(data);
    CreatUpdateuser(
      data,
      "POST",
      urlApiCreatUser,
      "Thêm mới thành công",
      "Thêm mới thất bại"
    );
  };
  //Cập nhật user

  const updateUser = async (data) => {
    //console.log(data);
    CreatUpdateuser(
      data,
      "PUT",
      urlApiUpdateUser,
      "Cập nhật thành công",
      "Cập nhật thất bại"
    );
  };

  useEffect(() => {
    if (statusCode === 200) {
      const timeout = setTimeout(() => {
        navigate("/users");
        console.log("1");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [statusCode]);

  return (
    <form onSubmit={handleSubmit(isUpdate ? updateUser : createUser)}>
      <div className="element__form">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ width: "300px" }}
        />
        <div className="element__form-header">
          <p>{title}</p>
        </div>
        <div className="element__form-body">
          {/* name */}
          <div className="nameUser mt-2">
            <label htmlFor="Name">
              {" "}
              Họ Tên <i className="fas fa-star-of-life"></i>
            </label>{" "}
            <br />
            <input
              type="text"
              name="name"
              id="Name"
              {...register("name", {
                required: "Vui lòng nhập tên!",
                maxLength: {
                  value: 50,
                  message: "Họ tên không được lớn hơn 50 ký tự",
                },
              })}
            />
            {errors.name && (
              <p className={"text-danger fw-bold"}>{errors.name.message}</p>
            )}
          </div>

          {/* email */}
          <div className="emailUser mt-2">
            <label htmlFor="Email">
              Email <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              disabled={isUpdate}
              type="text"
              name="email"
              id="Email"
              {...register("email", {
                required: "Email không được để trống",
                maxLength: {
                  value: 50,
                  message: "Email không được lớn hơn 50 ký tự",
                },
              })}
            />
            {errors.email && (
              <p className={"text-danger fw-bold"}>{errors.email.message}</p>
            )}
          </div>

          {/* phone */}
          <div className="phoneUser mt-2">
            <label htmlFor="Phone">
              Số điện thoại <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              disabled={isUpdate}
              type="text"
              name="phone"
              id="Phone"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại!",
                maxLength: {
                  value: 11,
                  message: "Số điện thoại không được lớn hơn 11 ký tự",
                },
                minLength: {
                  value: 10,
                  message: "Số điện thoại không được ít hơn 10 ký tự",
                },
              })}
            />
            {errors.phone && (
              <p className={"text-danger fw-bold"}>{errors.phone.message}</p>
            )}
          </div>
          {/* password */}
          <div className="passwordUser mt-2">
            <label htmlFor="Password">
              Mật khẩu <i className="fas fa-star-of-life"></i>
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="Password"
              {...register(
                "password",
                !isUpdate && {
                  required: "Vui lòng nhập mật khẩu!",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu không được nhỏ hơn 8 ký tự",
                  },
                }
              )}
            />
            {errors.password && (
              <p className={"text-danger fw-bold"}>{errors.password.message}</p>
            )}
          </div>

          {/* gender */}
          <div className="gender mt-2">
            <label htmlFor="Gender">Giới tính</label> <br></br>
            <select
              {...register(
                "gender",
                !isUpdate && {
                  required: "Vui lòng chọn giới tính!",
                }
              )}
              id="Gender"
            >
              <option value="">Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
            </select>
          </div>
          {errors.gender && (
            <p className={"text-danger fw-bold"}>{errors.gender.message}</p>
          )}

          {/* birthday */}
          <div className="birthdayUser mt-2">
            <label htmlFor="Birthday">Ngày Sinh</label> <br />
            <input
              type="date"
              name="birthday"
              id="Birthday"
              {...register("birthday")}
            />
          </div>

          {/* address */}
          <div className="addressUser mt-2">
            <label htmlFor="Address">Địa chỉ</label> <br />
            <input
              type="text"
              name="address"
              id="Address"
              {...register("address")}
            />
          </div>

          {/* avatar */}
          <div class="mt-3">
            <label for="formFile" class="form-label">
              <label htmlFor="Avatar">Ảnh đại diện</label>
            </label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              {...register("avatar")}
            />
          </div>
          {/* level */}
          <div className="Dec mt-3">
            <div>
              <label className="form-label">
                Phân quyền <span className={"text-danger fw-bold"}>*</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inputLevelAdmin"
                value="1"
                {...register("level")}
              />
              <label className="form-check-label" htmlFor="inputLevelAdmin">
                admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inputLevelUser"
                value="2"
                {...register("level")}
              />
              <label className="form-check-label" htmlFor="inputLevelUser">
                user
              </label>
            </div>
          </div>
        </div>
        <div className="element__form-footer">
          {(() => {
            if (isUpdate) {
              return <button className={"btn btn-success"}>Cập nhật</button>;
            }
            return <button className={"btn btn-primary"}>Thêm mới</button>;
          })()}
        </div>
      </div>
    </form>
  );
}

export default Form;
