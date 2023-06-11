import { Box, LinearProgress, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { AlertType } from "stores/AlertStore";
import MainTemplate from "components/templates/MainTemplate";
import axios from "axios";
import { useEffect } from "react";
import { useStores } from "stores/Context";

const SignUpLinkConfirmPage = () => {
  const { jwt } = useParams();
  const navigate = useNavigate();
  const { alertStore } = useStores();
  useEffect(() => {
    const verifyJwt = async () => {
      try {
        const response = await axios.post(
          "https://port-0-auth-nest-7xwyjq992llir9r422.sel4.cloudtype.app/auth/verification/link",
          {
            token: jwt,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // 유효한 JWT인 경우, 회원가입 완료 페이지로 이동
          alertStore.setMessage("이메일 인증이 되었습니다. 로그인해주세요");
          navigate("/signin");
        } else {
          // 유효하지 않은 JWT인 경우, 에러 페이지로 이동
          alertStore.setMessage(
            "링크가 만료되었습니다. 다시 회원가입해주세요.",
            AlertType.INFO
          );
          navigate("/signup");
        }
      } catch (error) {
        // API 호출 중에 오류가 발생한 경우, 에러 페이지로 이동
        alertStore.setMessage(
          "회원가입에 실패했습니다. 다시 회원가입해주세요.",
          AlertType.ERROR
        );
        navigate("/signup");
      } finally {
        setTimeout(() => {
          alertStore.clearMessage();
        }, 3000);
      }
    };

    // jwt 유효성 검증을 수행
    verifyJwt();
  }, [jwt, navigate]);

  return (
    <MainTemplate>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        이메일 검증 중...
        <Stack sx={{ width: "40%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      </Box>
    </MainTemplate>
  );
};

export default SignUpLinkConfirmPage;
