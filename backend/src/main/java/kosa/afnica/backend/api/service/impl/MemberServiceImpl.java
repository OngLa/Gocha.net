package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.servlet.http.HttpServletRequest;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean existVeriEmail(String veriEmail) {
        int count = memberMapper.existByVeriEmail(veriEmail);
        return count == 0;
    }

    @Override
    public boolean existEmail(String email) {
        int count = memberMapper.existByEmail(email);
        return count == 0;
    }

    @Override
    public boolean existName(String name) {
        int count = memberMapper.existByName(name);
        return count == 0; // 중복 없음
    }

    @Override
    public void createMember(MemberSignupReqDto memberSignupReqDto) {

        Member member = Member.builder()
                .email(memberSignupReqDto.getEmail())
                .name(memberSignupReqDto.getName())
                .password(passwordEncoder.encode(memberSignupReqDto.getPassword()))
                .phoneNumber(memberSignupReqDto.getPhoneNumber())
                .address(memberSignupReqDto.getAddress())
                .role(memberSignupReqDto.getRole())
                .build();

        memberMapper.save(member);
    }

  /*  @Override
    public void creatAdminMember(MemberSignupReqDto memberSignupReqDto) {

        Member member = Member.builder()
                .email(memberSignupReqDto.getEmail())
                .name(memberSignupReqDto.getName())
                .password(passwordEncoder.encode(memberSignupReqDto.getPassword()))
                .phoneNumber(memberSignupReqDto.getPhoneNumber())
                .address(memberSignupReqDto.getAddress())
                .role(memberSignupReqDto.getRole())
                .build();

        memberMapper.saveAdmin(member);

    }*/

    @Override
    public String findRole(String email) {
        //FE에서 로그인한 멤버의 권한을 확인할 수 있도록 Role찾기
        return memberMapper.findRoleByEmail(email);
    }

    @Override
    public MemberMypageResDto findMypage(HttpServletRequest request) {
        // Token으로부터 Member 얻어오기
        String userEmail = JwtUtil.getEmail(request.getHeader("Authorization").substring(7));

        Member member = memberMapper.findByEmail(userEmail)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        return new MemberMypageResDto(member);
    }

    @Override
    public void findCode(String veriEmail, String veriCode) {
        if(this.existVeriEmail(veriEmail)) { // 이메일 존재하지 않으면
            throw new CustomException(ErrorCode.EMAIL_NOT_FOUND);
        } else { // 이메일 존재하면 -> 비교
            String storedCode = memberMapper.findCodeByEmail(veriEmail);
            if(storedCode.equals(veriCode)) {
                log.info("이메일 인증 성공");
            } else {
                throw new CustomException(ErrorCode.CODE_NOT_FOUND);
            }
        }
    }
}



