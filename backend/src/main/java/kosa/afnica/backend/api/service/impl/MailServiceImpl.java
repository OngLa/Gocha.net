package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MailService;
import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.db.entity.Verification;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MailServiceImpl implements MailService {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final JavaMailSender emailSender;

    // 이메일 전송에 사용되는 이메일 발신자의 이메일 주소
    private static final String senderEmail = "jisun4547@gmail.com";

    // 생성된 인증 번호를 저장하는 클래스 변수
    private String ePw;

    // 메세지 생성하여 반환
    private MimeMessage createMessage(String email)throws Exception {

        MimeMessage message = emailSender.createMimeMessage();

        // 메세지 설정
        message.addRecipients(Message.RecipientType.TO, email); // 받는 대상
        message.setSubject("GOCHANET : 인증 번호 안내 메일입니다."); // 제목

        // HTML 형식의 이메일 내용 작성
        String msgg ="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 인증 번호 안내 </h1>";
        msgg+= "<br>";
        msgg+= "<p>GOCHANET을 이용해주셔서 감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>인증 번호를 확인하여 회원가입을 완료해주세요.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid #A4DABE; background:#5D707F font-family:verdana';>";
        msgg+= "<h3 style='color:#45CB85;'>회원가입 인증 번호입니다.</h3>";
        msgg+= "<div style='font-size:130% color:#47F6C1'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html"); // 메세지 내용과 형식 설정
        message.setFrom(new InternetAddress(senderEmail)); // 보내는 대상

        return message;
    }

    // 인증번호 생성히여 반환
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        // 8자리의 랜덤한 인증코드 생성
        for (int i = 0; i < 8; i++) {
            // 0~2까지의 랜덤 값을 생성
            int index = random.nextInt(3);

            // index 값에 따라 알파벳 대문자, 소문자, 숫자를 생성하여 key에 추가
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

    // 인증번호 전송 및 저장
    @Override
    public void sendMessage(String veriEmail) throws Exception {
        // 회원 서비스를 통해 해당 이메일 주소가 존재하는지 확인
        if (memberService.existVeriEmail(veriEmail)) { // 존재하지 않으면
            ePw = createKey();
            MimeMessage message = createMessage(veriEmail);
            try {
                emailSender.send(message);
            } catch (MailException es) {
                es.printStackTrace();
                throw new CustomException(ErrorCode.UNABLE_TO_SEND_EMAIL);
            }

            // 데이터베이스에 인증 정보를 저장
            Verification verification = Verification.builder()
                    .veriEmail(veriEmail)
                    .veriCode(ePw)
                    .build();

            memberMapper.saveCode(verification);
        } else {
            // 메세지를 생성하고 이메일을 전송
            ePw = createKey();
            MimeMessage message = createMessage(veriEmail);
            try {
                emailSender.send(message);
            } catch (MailException es) {
                es.printStackTrace();
                throw new CustomException(ErrorCode.UNABLE_TO_SEND_EMAIL);
            }
            // 데이터베이스에 이미 존재하는 인증 정보를 업데이트
            memberMapper.updateCode(veriEmail, ePw);
        }
    }
}