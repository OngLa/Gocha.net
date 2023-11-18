package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MailService;
import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import kosa.afnica.backend.db.entity.Member;

import kosa.afnica.backend.db.entity.Verification;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Email;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
//    private final MailService mailService;
    private final JavaMailSender emailSender;

    private static final String senderEmail = "";
    public static final String ePw = createKey();

    // 메세지 생성해서 반환
    private MimeMessage createMessage(String email)throws Exception {
        log.info("보내는 대상: " + email);
        log.info("인증 번호: " + ePw);
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email); // 보내는 대상
        message.setSubject("GOCHANET : 인증 번호 안내 메일입니다."); // 제목

        String msgg ="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 인증 번호 안내 </h1>";
        msgg+= "<br>";
        msgg+= "<p>GOCHANET을 이용해주셔서 감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>인증 번호를 확인하여 회원가입을 완료해주세요.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid #A4DABE; background:#5D707F';>";
        msgg+= "<h3 style='color:#45CB85;'>회원가입 인증 번호입니다.</h3>";
        msgg+= "<div style='font-size:130% color:#47F6C1'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress(senderEmail));//보내는 사람

        return message;
    }

    // 인증번호 생성해서 반환
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = random.nextInt(3); // 0~2까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (random.nextInt(26)) + 97));
                    // a ~ z
                    // ex) 1+97=98 -> (char)98 = 'b'
                    break;
                case 1:
                    key.append((char) ((int) (random.nextInt(26)) + 65));
                    // A ~ Z
                case 2:
                    key.append((random.nextInt(10)));
                    // 0 ~ 9
                    break;
            }
        }
        return key.toString();
    }

    // 인증번호 전송
    @Override
    public String sendMessage(String email) throws Exception {
        MimeMessage message = createMessage(email);
        try {
            emailSender.send(message);
        } catch (MailException es) {
            es.printStackTrace();
        }

        Verification verification = Verification.builder()
                        .veriEmail(email)
                        .veriCode(ePw)
                        .build();

        memberMapper.saveCode(verification);

        return ePw;
    }




    @Override
    public boolean existEmail(String email) {
        int count = memberMapper.existByEmail(email);
        return count == 0;
    }

    @Override
    public boolean existName(String name) {
        int count = memberMapper.existByName(name);
        return count == 0; // 중복 안됨
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


//    // 인증번호 생성 후 이메일로 인증번호 전송
//    @Override
//    public void sendCodeToemail(String email) {
//        this.existEmail(email);
//            String title = "Travel with me 이메일 인증 번호";
//            String authCode = this.createCode();
//            mailService.sendEmail(email, title, authCode);
//            memberMapper.saveCode(new Verification());
//    }
//
//    // 인증 번호 생성하여 반환
//    @Override
//    public String createCode() {
//        int lenth = 6;
//        try {
//            Random random = SecureRandom.getInstanceStrong();
//            StringBuilder builder = new StringBuilder();
//            for (int i = 0; i < lenth; i++) {
//                builder.append(random.nextInt(10));
//            }
//            return builder.toString();
//        } catch (NoSuchAlgorithmException e) {
//            log.debug("MemberService.createCode() exception occur");
//            throw new CustomException(ErrorCode.NO_SUCH_ALGORITHM);
//        }
//    }
//
//    // 인증 번호 비교
//    @Override
//    public boolean verifiedCode(String email, String veriCode) {
//        this.existEmail(email);
//        String redisAuthCode = memberMapper.findCodeByEmail(email);
//        int count = memberMapper.countVerificationCodeByEmail(email, veriCode);
//
//        return count == 1;
//    }
}



