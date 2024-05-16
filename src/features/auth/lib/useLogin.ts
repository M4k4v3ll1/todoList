import { useAppSelector } from "app/store"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import { authThunks } from "features/auth/model/authSlice"
import { BaseResponseType } from "common/types"
import { LoginType } from "features/auth/api/authApi.types"

type FormikErrorType = Omit<Partial<LoginType>, "captcha">

export const useLogin = () => {
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const dispatch = useDispatch<any>()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Password is required"
      } else if (values.password.length < 4) {
        errors.password = "Password is less than 4 symbols"
      }
      return errors
    },
    onSubmit: (values, formikHelpers) => {
      dispatch(authThunks.login({ data: values }))
        .unwrap()
        .then((res: any) => {})
        .catch((e: BaseResponseType) => {
          if (e.fieldsErrors) {
            e.fieldsErrors.forEach((el) => {
              formikHelpers.setFieldError(el.field, el.error)
            })
          }
        })
      formik.resetForm()
    },
  })

  return {
    isLoggedIn,
    formik,
  }
}
