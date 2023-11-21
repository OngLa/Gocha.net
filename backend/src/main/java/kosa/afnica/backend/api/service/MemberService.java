package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import kosa.afnica.backend.db.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface MemberService {

    // 이메일 중복 검사
    boolean existEmail(String email);

    // 닉네임 중복 검사
    boolean existName(String name);

    // 회원가입
    public void createMember(MemberSignupReqDto memberSignupReqDto);

//    public void creatAdminMember(MemberSignupReqDto memberSignupReqDto);

    // 이메일로 권한 찾기
    String findRole(String email);

    MemberMypageResDto findMypage(HttpServletRequest request);

    //정비소 목록 출력
    public List<Member> readCarcenter();

}
