import React, { useState } from 'react';
import { LoginControllerService } from '../../services/LoginControllerService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthProvider';
import { CircularProgress, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import { isValidCPF } from '../../utils/cpfUtils';

const LoginComponent = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [onLoad, setOnLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnLoad(true);

    const dataLogin = {
      cpf: e.target.cpf.value,
      password: e.target.password.value
    };

    if (!isValidCPF(dataLogin.cpf)) {
      Swal.fire({
        title: 'Erro',
        text: 'CPF inválido',
        icon: 'error'
      });
      setOnLoad(false);
      return;
    }

    try {
      const response = await LoginControllerService.loginUser(dataLogin);

      setOnLoad(false);

      if (response === 200) {
        setAuthToken(localStorage.getItem('user'));
        Swal.fire({
          title: 'Login realizado com sucesso!',
          text: 'Você será redirecionado para o dashboard.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          localStorage.setItem("userLogged", dataLogin.cpf);
          navigate("/user/dashboard");
        }, 1500);
      } else if (response === 401) {
        Swal.fire({
          title: 'Erro',
          text: 'Usuário ou senha inválidos',
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Erro',
          text: 'Erro ao efetuar login. Tente novamente mais tarde.',
          icon: 'error'
        });
      }
    } catch (error) {
      setOnLoad(false);
      Swal.fire({
        title: 'Erro',
        text: 'Erro ao efetuar login. Tente novamente mais tarde.',
        icon: 'error'
      });
    }
  };

  return (
    <div className='h-full w-full flex flex-col items-center justify-between py-[20%]'>
      <svg width="30%" height="30%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M475.499 82.4993C625.578 79.1343 746.078 136.467 836.999 254.499C920.401 375.658 938.068 505.991 889.999 645.499C842.86 764.638 759.36 846.804 639.499 891.999C510.834 934.851 388.834 920.851 273.499 849.999C157.269 770.908 93.7694 660.742 82.9994 519.499C79.5798 392.362 123.079 284.529 213.499 195.999C287.462 127.864 374.795 90.0308 475.499 82.4993Z" fill="#02796A" />
        <path fillRule="evenodd" clipRule="evenodd" d="M613.5 328.5C615.482 315.208 616.149 301.541 615.5 287.5C571.167 287.5 526.833 287.5 482.5 287.5C492.315 273.394 502.982 259.894 514.5 247C521.525 243.21 528.858 242.543 536.5 245C580.179 262.337 625.179 275.004 671.5 283C679.493 283.5 687.493 283.666 695.5 283.5C695.5 312.167 695.5 340.833 695.5 369.5C684.424 369.465 673.757 371.632 663.5 376C641.35 381.749 619.017 382.749 596.5 379C586.144 377.107 575.81 375.107 565.5 373C541.167 372.667 516.833 372.333 492.5 372C485.327 371.5 478.327 370.166 471.5 368C462.346 362.42 461.346 355.753 468.5 348C475.633 344.195 483.3 342.195 491.5 342C516.167 341.667 540.833 341.333 565.5 341C581.285 335.903 597.285 331.736 613.5 328.5Z" fill="#FCFDFD" />
        <path fillRule="evenodd" clipRule="evenodd" d="M707.5 262.5C722.837 262.333 738.17 262.5 753.5 263C754 263.5 754.5 264 755 264.5C755.667 310.833 755.667 357.167 755 403.5C754.5 404 754 404.5 753.5 405C737.833 405.667 722.167 405.667 706.5 405C706 404.5 705.5 404 705 403.5C704.333 357.167 704.333 310.833 705 264.5C705.995 263.934 706.828 263.267 707.5 262.5Z" fill="#FDFDFD" />
        <path fillRule="evenodd" clipRule="evenodd" d="M482.5 287.5C526.833 287.5 571.167 287.5 615.5 287.5C616.149 301.541 615.482 315.208 613.5 328.5C614.481 315.246 614.814 301.913 614.5 288.5C570.33 288.832 526.33 288.499 482.5 287.5Z" fill="#5DA79F" />
        <path fillRule="evenodd" clipRule="evenodd" d="M605.5 479.5C534.833 479.5 464.167 479.5 393.5 479.5C393.5 418.833 393.5 358.167 393.5 297.5C464.167 297.5 534.833 297.5 605.5 297.5C605.5 305.167 605.5 312.833 605.5 320.5C590.762 324.023 576.095 327.857 561.5 332C536.833 332.333 512.167 332.667 487.5 333C476.686 333.158 467.186 336.658 459 343.5C449.938 364.19 456.771 376.356 479.5 380C507.132 381.281 534.799 381.948 562.5 382C576.765 384.984 591.099 387.484 605.5 389.5C605.5 419.5 605.5 449.5 605.5 479.5Z" fill="#FDFDFD" />
        <path fillRule="evenodd" clipRule="evenodd" d="M428.5 406.501C424.958 406.188 421.625 406.522 418.5 407.501C417.957 407.441 417.624 407.108 417.5 406.501C421.315 405.193 424.981 405.193 428.5 406.501Z" fill="#7CB9B1" />
        <path fillRule="evenodd" clipRule="evenodd" d="M544.499 414.5C544.499 411.833 544.499 409.167 544.499 406.5C533.166 406.5 521.832 406.5 510.499 406.5C510.499 409.167 510.499 411.833 510.499 414.5C509.522 411.713 509.189 408.713 509.499 405.5C521.499 405.5 533.499 405.5 545.499 405.5C545.809 408.713 545.476 411.713 544.499 414.5Z" fill="#72B3AA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M552.5 406.5C561.986 405.506 571.652 405.173 581.5 405.5C581.81 408.713 581.477 411.713 580.5 414.5C580.5 411.833 580.5 409.167 580.5 406.5C571.5 406.5 562.5 406.5 553.5 406.5C553.167 406.5 552.833 406.5 552.5 406.5Z" fill="#74B3AA" />
        <path fillRule="evenodd" clipRule="evenodd" d="M544.5 414.5C540.5 414.5 536.5 414.5 532.5 414.5C532.5 428.167 532.5 441.833 532.5 455.5C529.167 455.5 525.833 455.5 522.5 455.5C522.5 441.833 522.5 428.167 522.5 414.5C518.5 414.5 514.5 414.5 510.5 414.5C510.5 411.833 510.5 409.167 510.5 406.5C521.833 406.5 533.167 406.5 544.5 406.5C544.5 409.167 544.5 411.833 544.5 414.5Z" fill="#04796A" />
        <path fillRule="evenodd" clipRule="evenodd" d="M418.5 407.5C421.625 406.521 424.958 406.187 428.5 406.5C432.152 419.438 435.652 432.438 439 445.5C442.346 432.451 445.846 419.451 449.5 406.5C452.768 405.513 456.102 405.18 459.5 405.5C454.977 421.904 450.144 438.237 445 454.5C441 455.833 437 455.833 433 454.5C428.261 438.785 423.428 423.119 418.5 407.5Z" fill="#117B6D" />
        <path fillRule="evenodd" clipRule="evenodd" d="M326.5 432.5C345.5 432.5 364.5 432.5 383.5 432.5C383.5 445.167 383.5 457.833 383.5 470.5C374.932 469.523 367.265 471.69 360.5 477C355.854 480.497 355.52 484.164 359.5 488C452.833 488.667 546.167 488.667 639.5 488C643.48 484.164 643.146 480.497 638.5 477C631.658 471.912 623.991 469.745 615.5 470.5C615.5 457.833 615.5 445.167 615.5 432.5C634.503 432.333 653.503 432.5 672.5 433C700 463.833 727.5 494.667 755 525.5C755.5 549.831 755.667 574.164 755.5 598.5C584.833 598.5 414.167 598.5 243.5 598.5C243.333 574.164 243.5 549.831 244 525.5C271.708 494.629 299.208 463.629 326.5 432.5Z" fill="#FDFEFE" />
        <path fillRule="evenodd" clipRule="evenodd" d="M477.499 405.499C484.876 404.688 491.876 405.855 498.499 408.999C502.256 412.42 504.756 416.587 505.999 421.499C507.515 430.973 506.182 439.973 501.999 448.499C499.44 451.53 496.273 453.697 492.499 454.999C472.898 457.903 462.898 449.403 462.499 429.499C461.995 417.801 466.995 409.801 477.499 405.499Z" fill="#0E7B6C" />
        <path fillRule="evenodd" clipRule="evenodd" d="M479.499 415.499C483.181 415.334 486.847 415.5 490.499 415.999C492.725 417.226 494.225 419.06 494.999 421.499C497.456 429.141 496.789 436.474 492.999 443.499C488.39 445.509 483.557 446.009 478.499 444.999C476.95 443.785 475.784 442.285 474.999 440.499C473.463 434.25 473.129 427.916 473.999 421.499C475.359 418.976 477.192 416.976 479.499 415.499Z" fill="#F8FAF9" />
        <path fillRule="evenodd" clipRule="evenodd" d="M553.5 406.5C562.5 406.5 571.5 406.5 580.5 406.5C580.5 409.167 580.5 411.833 580.5 414.5C574.833 414.5 569.167 414.5 563.5 414.5C563.5 418.167 563.5 421.833 563.5 425.5C568.833 425.5 574.167 425.5 579.5 425.5C579.5 428.167 579.5 430.833 579.5 433.5C574.167 433.5 568.833 433.5 563.5 433.5C563.5 437.833 563.5 442.167 563.5 446.5C569.167 446.5 574.833 446.5 580.5 446.5C580.5 449.167 580.5 451.833 580.5 454.5C571.5 454.5 562.5 454.5 553.5 454.5C553.5 438.5 553.5 422.5 553.5 406.5Z" fill="#05796A" />
        <path fillRule="evenodd" clipRule="evenodd" d="M552.5 406.5C552.833 406.5 553.167 406.5 553.5 406.5C553.5 422.5 553.5 438.5 553.5 454.5C562.5 454.5 571.5 454.5 580.5 454.5C580.5 451.833 580.5 449.167 580.5 446.5C581.477 449.287 581.81 452.287 581.5 455.5C571.833 455.5 562.167 455.5 552.5 455.5C552.5 439.167 552.5 422.833 552.5 406.5Z" fill="#4FA097" />
        <path fillRule="evenodd" clipRule="evenodd" d="M393.5 479.5C464.167 479.5 534.833 479.5 605.5 479.5C594.552 482.469 594.885 484.969 606.5 487C601.428 487.751 596.428 487.418 591.5 486C591.056 484.467 590.723 482.967 590.5 481.5C524.668 480.833 459.001 480.167 393.5 479.5Z" fill="#1B8679" />
        <path fillRule="evenodd" clipRule="evenodd" d="M262.5 618.5C420.5 618.5 578.5 618.5 736.5 618.5C736.5 664.167 736.5 709.833 736.5 755.5C578.5 755.5 420.5 755.5 262.5 755.5C262.5 709.833 262.5 664.167 262.5 618.5Z" fill="#FEFEFE" />
      </svg>
      <h2 className='font-bold text-3xl'>Fazer login</h2>
      <form className='flex flex-col items-center justify-center w-full px-[20%] gap-y-4' onSubmit={handleSubmit}>
        <TextField id="cpf" label="Login"
        className='w-full pl-4 mx-4 py-4 mb-4 border rounded-md border-emerald-200 shadow-md focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700'
         variant="outlined"
         name='cpf'
         defaultValue={"43194161040"} />
        <input type="password" placeholder="Insira sua senha" className="w-full pl-4 mx-4 py-4 mb-4 border rounded-md border-emerald-200 shadow-md focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          name="password"
          required
        />
        <button type="submit" className="px-4 py-3 w-full bg-emerald-700 text-white text-opacity-70 font-bold text-xl rounded-lg hover:text-opacity-100 hover:bg-emerald-800 duration-150 ease-in-out" disabled={onLoad}>
          {onLoad ? <CircularProgress color="inherit" size={24} /> : "Entrar"}
        </button>
      </form>
      <p className='text-sm'>Não tem uma conta? <span href="#" className='text-emerald-700 hover:text-emerald-800 cursor-pointer'>Contate um responsável</span></p>
    </div>
  );
};

export default LoginComponent;