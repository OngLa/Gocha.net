package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;

import javax.servlet.http.HttpServletRequest;

public interface MemberService {

    // 이메일 중복 검사
    boolean existEmail(String email);

    // 닉네임 중복 검사
    boolean existName(String name);

    // 회원가입
    public void createMember(MemberSignupReqDto memberSignupReqDto);

//    public void creatAdminMember(MemberSignupReqDto memberSignupReqDto);

    String findRole(String email);

    MemberMypageResDto findMypage(HttpServletRequest request);

    String sendMessage(String email) throws Exception;

//    public void sendCodeToemail(String email);
//
//    public void checkDuplicateEmail(String email);
//
//    public String createCode();
//
//    public void verifiedCode(String email, String authCode);

}
