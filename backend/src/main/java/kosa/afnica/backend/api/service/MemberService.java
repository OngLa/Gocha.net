package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.member.MemberEditPwReqDto;
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

    // 이메일로 권한 찾기
    String findRole(String email);

    // 마이페이지 조회
    MemberMypageResDto findMypage(HttpServletRequest request);

    // veriCode 테이블 이메일 중복 검사
    boolean existVeriEmail(String veriEmail);

    // 코드 조회
    void findCode(String veriEmail, String veriCode);

    //정비소 목록 출력
    List<Member> findCarcenter();

    // 인증번호 갱신
    void updatePw(MemberEditPwReqDto memberEditPwResDto);

    // 회원탈퇴
    void deleteMember(HttpServletRequest request);

}
