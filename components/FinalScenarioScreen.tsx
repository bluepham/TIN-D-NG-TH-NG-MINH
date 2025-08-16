
import React, { useState, useEffect } from 'react';
import { ShieldIcon } from './Icons';

type FeedbackType = 'correct' | 'incorrect' | 'neutral';

interface ScenarioOption {
    text: string;
    feedbackType: FeedbackType;
    feedbackText: string;
}

interface Scenario {
    id: number;
    situation: React.ReactNode;
    options: ScenarioOption[];
}

const scenarios: Scenario[] = [
    {
        id: 1,
        situation: <>Một người lạ mặt tiếp cận và mời bạn vay tiền, thủ tục chỉ cần CMND/CCCD, giải ngân trong 5 phút. <strong>Bạn sẽ làm gì?</strong></>,
        options: [
            { text: "Đồng ý vay vì đang rất cần tiền", feedbackType: 'incorrect', feedbackText: "Sai! Đây là lựa chọn nguy hiểm nhất. Vay tín dụng đen sẽ đẩy bạn vào vòng xoáy nợ nần với lãi suất cắt cổ." },
            { text: "Từ chối thẳng thừng và bỏ đi", feedbackType: 'neutral', feedbackText: "Khá tốt. Từ chối là đúng, nhưng cần cảnh giác và có biện pháp bảo vệ bản thân xa hơn." },
            { text: "Từ chối, không cung cấp thông tin cá nhân và báo cho người thân/cơ quan chức năng", feedbackType: 'correct', feedbackText: "Chính xác! Đây là cách xử lý thông minh và an toàn nhất. Bạn vừa bảo vệ được bản thân, vừa giúp cảnh báo cho cộng đồng." }
        ]
    },
    {
        id: 2,
        situation: <>Bạn thấy quảng cáo 'app vay tiền online' giải ngân trong 2 phút. App yêu cầu bạn cấp quyền truy cập vào danh bạ và hình ảnh. <strong>Bạn sẽ làm gì?</strong></>,
        options: [
            { text: "Cài đặt app và cấp quyền vì nghĩ nó tiện lợi", feedbackType: 'incorrect', feedbackText: "Rất nguy hiểm! Các app tín dụng đen dùng quyền truy cập danh bạ để khủng bố, đe dọa người thân của bạn nếu bạn trả nợ chậm." },
            { text: "Bỏ qua quảng cáo và không quan tâm", feedbackType: 'neutral', feedbackText: "An toàn cho bạn, nhưng bạn có thể giúp người khác bằng cách báo cáo (report) quảng cáo này." },
            { text: "Không cài đặt, báo cáo quảng cáo lừa đảo và cảnh báo bạn bè", feedbackType: 'correct', feedbackText: "Tuyệt vời! Hành động này không chỉ bảo vệ bạn mà còn bảo vệ cộng đồng khỏi các bẫy tín dụng đen trực tuyến." }
        ]
    },
    {
        id: 3,
        situation: <>Một người quen giới thiệu nơi cho vay 'lãi suất thấp', chỉ 5.000đ/1 triệu/ngày. <strong>Bạn có nên vay không?</strong></>,
        options: [
            { text: "Vay vì người quen giới thiệu và lãi suất nghe có vẻ thấp", feedbackType: 'incorrect', feedbackText: "Sai lầm! Lãi suất đó tương đương 182.5%/năm. Đây là mức lãi suất 'cắt cổ', cao gấp nhiều lần quy định của nhà nước." },
            { text: "Từ chối vay nhưng không nói gì thêm", feedbackType: 'neutral', feedbackText: "Là một lựa chọn an toàn. Tuy nhiên, bạn có thể giúp người quen của mình hiểu rõ hơn về mức lãi suất thực sự." },
            { text: "Cảm ơn và từ chối, đồng thời giải thích cho người quen rằng đây là lãi suất rất cao", feedbackType: 'correct', feedbackText: "Rất tốt! Bạn không chỉ từ chối một khoản vay nguy hiểm mà còn giúp người quen của mình nhận ra rủi ro." }
        ]
    },
    {
        id: 4,
        situation: <>Bên cho vay yêu cầu bạn ký vào một hợp đồng vay tiền nhưng bỏ trống phần lãi suất, hứa sẽ "điền mức thấp nhất sau". <strong>Bạn nên làm gì?</strong></>,
        options: [
            { text: "Ký vì tin lời hứa của họ", feedbackType: 'incorrect', feedbackText: "Cực kỳ nguy hiểm! Họ có thể điền một mức lãi suất trên trời vào hợp đồng sau khi bạn đã ký, và bạn sẽ không thể chối cãi." },
            { text: "Yêu cầu họ điền đầy đủ thông tin rồi mới xem xét", feedbackType: 'correct', feedbackText: "Chính xác! Không bao giờ ký vào bất kỳ giấy tờ trống nào. Mọi điều khoản phải rõ ràng, minh bạch trước khi đặt bút ký." },
            { text: "Chụp ảnh lại hợp đồng trống để làm bằng chứng", feedbackType: 'neutral', feedbackText: "Việc này không có nhiều giá trị pháp lý. Tốt nhất là từ chối ký và tìm một tổ chức tín dụng uy tín." }
        ]
    },
    {
        id: 5,
        situation: <>Một app vay tiền thông báo khoản vay của bạn được duyệt, nhưng yêu cầu bạn phải chuyển trước 500.000 VNĐ gọi là "phí làm hồ sơ" để được giải ngân. <strong>Bạn sẽ làm gì?</strong></>,
        options: [
            { text: "Chuyển tiền ngay để nhận được khoản vay", feedbackType: 'incorrect', feedbackText: "Đây là dấu hiệu lừa đảo kinh điển. Sau khi nhận được tiền, chúng sẽ chặn bạn. Các tổ chức uy tín không bao giờ yêu cầu đóng phí trước." },
            { text: "Hủy yêu cầu vay và chặn số điện thoại đó", feedbackType: 'correct', feedbackText: "Đúng đắn! Đây là một hình thức lừa đảo để chiếm đoạt tài sản. Hãy cảnh giác và không chuyển bất kỳ khoản tiền nào." },
            { text: "Mặc cả để giảm phí làm hồ sơ xuống", feedbackType: 'neutral', feedbackText: "Sai! Bạn không nên thương lượng với kẻ lừa đảo. Cách duy nhất là cắt đứt mọi liên lạc." }
        ]
    },
    {
        id: 6,
        situation: <>Bạn thấy quảng cáo dịch vụ "đáo hạn thẻ tín dụng" với một khoản phí nhỏ, giúp bạn trả nợ thẻ đúng hạn mà không cần có tiền. <strong>Có nên sử dụng không?</strong></>,
        options: [
            { text: "Nên, vì nó giúp mình không bị phạt trả chậm", feedbackType: 'incorrect', feedbackText: "Không nên! Đây là hoạt động bất hợp pháp, rủi ro bị lộ thông tin thẻ và bị lừa đảo chiếm đoạt tiền rất cao." },
            { text: "Chỉ sử dụng khi thực sự không còn cách nào khác", feedbackType: 'incorrect', feedbackText: "Vẫn là lựa chọn sai. Rủi ro bị đánh cắp thông tin thẻ và tiền bạc là không đáng để đánh đổi." },
            { text: "Tuyệt đối không, và tìm cách vay mượn hợp pháp hoặc liên hệ ngân hàng", feedbackType: 'correct', feedbackText: "Chính xác. Hãy luôn bảo mật thông tin thẻ tín dụng của bạn và chỉ làm việc với các tổ chức tài chính hợp pháp." }
        ]
    },
    {
        id: 7,
        situation: <>Có người gọi điện, tự xưng là nhân viên ngân hàng, thông báo bạn được nâng hạn mức tín dụng và yêu cầu bạn đọc mã OTP vừa gửi đến máy. <strong>Bạn làm gì?</strong></>,
        options: [
            { text: "Đọc mã OTP vì họ là nhân viên ngân hàng", feedbackType: 'incorrect', feedbackText: "Tuyệt đối không! Mã OTP là chìa khóa cuối cùng để thực hiện giao dịch. Cung cấp nó đồng nghĩa với việc giao tiền của bạn cho kẻ gian." },
            { text: "Cúp máy ngay và gọi lên tổng đài chính thức của ngân hàng để xác minh", feedbackType: 'correct', feedbackText: "Rất chính xác! Ngân hàng không bao giờ yêu cầu khách hàng cung cấp OTP qua điện thoại. Đây chắc chắn là lừa đảo." },
            { text: "Hỏi họ thêm thông tin cá nhân của mình để kiểm tra", feedbackType: 'neutral', feedbackText: "Kẻ gian có thể đã có một số thông tin của bạn. Cách an toàn nhất là không cung cấp gì thêm và tự mình kiểm chứng qua kênh chính thức." }
        ]
    },
    {
        id: 8,
        situation: <>Một tài khoản Facebook lạ nhắn tin mời vay tiền và yêu cầu bạn gửi ảnh chụp CMND/CCCD hai mặt và ảnh selfie cầm giấy tờ đó. <strong>Bạn có nên gửi không?</strong></>,
        options: [
            { text: "Nên gửi vì thủ tục nhanh gọn", feedbackType: 'incorrect', feedbackText: "Không! Thông tin cá nhân của bạn có thể bị dùng để đăng ký vay tiền ở nhiều app khác, hoặc dùng vào các mục đích lừa đảo, vi phạm pháp luật." },
            { text: "Che một vài số trên CMND/CCCD rồi mới gửi", feedbackType: 'neutral', feedbackText: "Vẫn rất rủi ro. Tốt nhất là không gửi bất kỳ thông tin nhạy cảm nào cho những người không rõ danh tính trên mạng xã hội." },
            { text: "Từ chối, chặn tài khoản và báo cáo lừa đảo", feedbackType: 'correct', feedbackText: "Đây là hành động đúng đắn để bảo vệ an toàn thông tin cá nhân của bạn." }
        ]
    },
    // Adding more scenarios
    {
        id: 9,
        situation: <>Bạn được mời vào một nhóm "chơi hụi online" trên Zalo với lời hứa lãi suất cao và nhanh thu hồi vốn. <strong>Bạn có tham gia không?</strong></>,
        options: [
            { text: "Tham gia ngay để kiếm lời", feedbackType: 'incorrect', feedbackText: "Rất rủi ro! Chơi hụi online với người lạ có nguy cơ bị chủ hụi ôm tiền bỏ trốn rất cao và không được pháp luật bảo vệ." },
            { text: "Tham gia thử với một số tiền nhỏ", feedbackType: 'neutral', feedbackText: "Vẫn không nên. Dù số tiền nhỏ, bạn vẫn đang tiếp tay cho một hình thức có rủi ro lừa đảo và có thể mất tiền." },
            { text: "Từ chối và rời khỏi nhóm", feedbackType: 'correct', feedbackText: "Quyết định khôn ngoan. Hãy chỉ tham gia các hình thức đầu tư, tiết kiệm hợp pháp và được giám sát." }
        ]
    },
    {
        id: 10,
        situation: <>Sau khi trễ hẹn trả nợ một app vay tiền, bạn bị gọi điện đe dọa sẽ đăng ảnh bạn lên mạng xã hội với nội dung bôi nhọ. <strong>Bạn nên phản ứng thế nào?</strong></>,
        options: [
            { text: "Hoảng sợ và tìm mọi cách vay mượn chỗ khác để trả ngay cho họ", feedbackType: 'incorrect', feedbackText: "Đây chính là điều họ muốn. Việc này sẽ đẩy bạn vào vòng xoáy nợ nần không lối thoát. Đừng đầu hàng trước sự đe dọa." },
            { text: "Bình tĩnh, lưu lại bằng chứng (ghi âm, ảnh chụp màn hình) và trình báo cơ quan công an", feedbackType: 'correct', feedbackText: "Chính xác. Hành vi đe dọa, khủng bố để đòi nợ là vi phạm pháp luật. Hãy để pháp luật bảo vệ bạn." },
            { text: "Chửi lại và thách thức họ", feedbackType: 'neutral', feedbackText: "Việc này có thể làm tình hình tồi tệ hơn và khiến họ có những hành động manh động hơn. Tốt nhất là giữ im lặng và thu thập bằng chứng." }
        ]
    },
    {
        id: 11,
        situation: <>Bạn nợ 5 triệu đồng và không trả được. Bên cho vay đề nghị cho bạn vay thêm 10 triệu để trả khoản nợ cũ, với lãi suất cao hơn. <strong>Đây là gì?</strong></>,
        options: [
            { text: "Một sự giúp đỡ để bạn không bị nợ xấu", feedbackType: 'incorrect', feedbackText: "Không! Đây là chiêu trò 'lãi mẹ đẻ lãi con', một cái bẫy để khoản nợ của bạn tăng lên nhanh chóng và không thể kiểm soát." },
            { text: "Một hình thức tái cơ cấu nợ thông thường", feedbackType: 'incorrect', feedbackText: "Tái cơ cấu nợ hợp pháp phải do ngân hàng thực hiện với các điều khoản rõ ràng, không phải là chồng thêm một khoản vay lãi cao hơn." },
            { text: "Một cái bẫy nợ nần (debt trap)", feedbackType: 'correct', feedbackText: "Đúng vậy. Mục đích của họ là làm cho bạn mắc nợ sâu hơn. Hãy từ chối và tìm kiếm sự trợ giúp từ người thân hoặc các tổ chức tư vấn tài chính." }
        ]
    },
    {
        id: 12,
        situation: <>Tiệm cầm đồ yêu cầu giữ bản gốc CMND/CCCD hoặc hộ chiếu của bạn để cho vay. <strong>Điều này có hợp pháp không?</strong></>,
        options: [
            { text: "Hợp pháp, đây là một dạng tài sản thế chấp", feedbackType: 'incorrect', feedbackText: "Sai. Theo luật, các tổ chức không có quyền thu giữ bản gốc giấy tờ tùy thân của công dân. Bạn có nguy cơ bị đánh cắp danh tính." },
            { text: "Không chắc, nhưng vẫn chấp nhận vì cần tiền", feedbackType: 'neutral', feedbackText: "Đây là một quyết định rủi ro. Việc mất giấy tờ tùy thân có thể dẫn đến nhiều hệ lụy pháp lý nghiêm trọng." },
            { text: "Bất hợp pháp, tôi sẽ không cầm cố giấy tờ tùy thân", feedbackType: 'correct', feedbackText: "Chính xác. Hãy bảo vệ giấy tờ tùy thân của bạn và chỉ giao dịch với các đơn vị tuân thủ pháp luật." }
        ]
    },
    {
        id: 13,
        situation: <>Một dịch vụ quảng cáo có thể "xóa nợ xấu" trên hệ thống của Trung tâm Thông tin tín dụng Quốc gia (CIC) với một khoản phí. <strong>Bạn có tin không?</strong></>,
        options: [
            { text: "Tin và trả phí để làm sạch lịch sử tín dụng", feedbackType: 'incorrect', feedbackText: "Đây là lừa đảo 100%. Không ai có thể can thiệp bất hợp pháp vào dữ liệu của CIC. Bạn sẽ mất tiền oan." },
            { text: "Cách duy nhất để cải thiện lịch sử tín dụng là trả hết nợ và duy trì thói quen thanh toán tốt", feedbackType: 'correct', feedbackText: "Hoàn toàn đúng. Lịch sử tín dụng sẽ tự động cải thiện theo thời gian khi bạn có trách nhiệm với các khoản vay của mình." },
            { text: "Hỏi họ về quy trình để xem có đáng tin không", feedbackType: 'neutral', feedbackText: "Không cần thiết. Mọi lời quảng cáo về việc 'xóa nợ xấu' đều là lừa đảo. Đừng lãng phí thời gian và tiền bạc." }
        ]
    },
    {
        id: 14,
        situation: <>Bên cho vay yêu cầu bạn cung cấp mật khẩu Facebook và Zalo để "xác minh mối quan hệ xã hội". <strong>Bạn có nên cung cấp không?</strong></>,
        options: [
            { text: "Cung cấp vì mình không có gì để giấu", feedbackType: 'incorrect', feedbackText: "Rất nguy hiểm! Họ có thể chiếm đoạt tài khoản, lừa đảo bạn bè, người thân của bạn, hoặc dùng thông tin riêng tư để tống tiền." },
            { text: "Tạo một mật khẩu tạm thời rồi đổi lại sau", feedbackType: 'neutral', feedbackText: "Vẫn quá rủi ro. Trong thời gian họ có quyền truy cập, họ có thể tải về toàn bộ dữ liệu của bạn." },
            { text: "Tuyệt đối không. Mật khẩu là thông tin cá nhân tối mật", feedbackType: 'correct', feedbackText: "Chính xác. Không một tổ chức tín dụng hợp pháp nào lại yêu cầu một điều vô lý và xâm phạm quyền riêng tư như vậy." }
        ]
    },
    {
        id: 15,
        situation: <>Bên cho vay gây áp lực, nói rằng "ưu đãi lãi suất này chỉ còn trong 10 phút nữa, phải quyết định ngay". <strong>Tại sao họ lại làm vậy?</strong></>,
        options: [
            { text: "Vì đây là một chương trình khuyến mãi tốt thực sự", feedbackType: 'incorrect', feedbackText: "Không. Đây là một chiêu trò tâm lý nhằm làm bạn không có đủ thời gian suy nghĩ kỹ và phát hiện ra những điều bất thường trong hợp đồng." },
            { text: "Đây là một chiến thuật gây áp lực để bạn đưa ra quyết định vội vàng", feedbackType: 'correct', feedbackText: "Đúng vậy. Hãy luôn cẩn trọng với những ai không cho bạn đủ thời gian để đọc kỹ và suy nghĩ. Một đề nghị tốt sẽ không sợ bạn cân nhắc." },
            { text: "Họ bận và không có nhiều thời gian", feedbackType: 'neutral', feedbackText: "Một tổ chức chuyên nghiệp sẽ luôn tôn trọng thời gian của khách hàng. Sự vội vã này là một dấu hiệu đáng ngờ." }
        ]
    },
    {
        id: 16,
        situation: <>Bạn nhận được một tin nhắn thông báo trúng thưởng một món quà giá trị và chỉ cần đóng một khoản "phí vận chuyển" nhỏ để nhận. <strong>Bạn sẽ làm gì?</strong></>,
        options: [
            { text: "Đóng tiền ngay để nhận thưởng", feedbackType: 'incorrect', feedbackText: "Đây là hình thức lừa đảo phổ biến. Không có giải thưởng nào cả, họ chỉ muốn chiếm đoạt 'phí vận chuyển' của bạn." },
            { text: "Xóa tin nhắn và không quan tâm", feedbackType: 'correct', feedbackText: "Chính xác. Nếu bạn không tham gia chương trình nào thì không thể trúng thưởng. Đây là một cái bẫy." },
            { text: "Gọi lại số điện thoại đó để hỏi cho rõ", feedbackType: 'neutral', feedbackText: "Không nên. Việc này có thể khiến bạn bị lôi kéo vào câu chuyện của kẻ lừa đảo hoặc bị tính cước điện thoại cao." }
        ]
    },
    {
        id: 17,
        situation: <>Lãi suất được quảng cáo là "2 nghìn một triệu" nhưng không nói rõ là theo ngày, tuần hay tháng. <strong>Bạn nên hiểu thế nào?</strong></>,
        options: [
            { text: "Mặc định hiểu là theo tháng cho có lợi", feedbackType: 'incorrect', feedbackText: "Sai. Sự mập mờ luôn được các đối tượng tín dụng đen sử dụng để gây bất lợi cho người vay. Họ sẽ luôn tính theo đơn vị thời gian ngắn nhất (ngày)." },
            { text: 'Yêu cầu họ ghi rõ trong hợp đồng là "lãi suất...%/năm"', feedbackType: 'correct', feedbackText: "Rất tốt. Luôn yêu cầu mọi thứ phải được quy đổi ra lãi suất theo năm và ghi rõ ràng trong hợp đồng để có cơ sở pháp lý." },
            { text: "Chấp nhận vì nghĩ đó là mức lãi suất chung", feedbackType: 'neutral', feedbackText: "Không có 'mức lãi suất chung' nào cả. Sự rõ ràng là yếu tố quan trọng nhất để bảo vệ bạn." }
        ]
    },
    {
        id: 18,
        situation: <>Một người bạn giới thiệu một nơi vay tiền rất nhanh và dễ. Người bạn đó đã vay và nhận được tiền. <strong>Điều đó có nghĩa là nơi đó an toàn không?</strong></>,
        options: [
            { text: "Có, vì đã có bạn bè kiểm chứng", feedbackType: 'incorrect', feedbackText: "Chưa chắc! Bạn của bạn có thể chưa đến hạn trả nợ, chưa trải qua các hình thức đòi nợ khủng bố, hoặc chưa nhận ra mức lãi suất thực sự." },
            { text: "Không hẳn, cần phải tự mình tìm hiểu kỹ về lãi suất và điều khoản", feedbackType: 'correct', feedbackText: "Đúng. Trải nghiệm của người khác chỉ là một nguồn tham khảo. Bạn phải tự chịu trách nhiệm về quyết định tài chính của mình." },
            { text: "An toàn, nhưng mình sẽ vay ít hơn bạn", feedbackType: 'neutral', feedbackText: "Số tiền vay không quyết định sự an toàn. Bản chất của tổ chức cho vay mới là điều quan trọng. Hãy tránh xa nếu có dấu hiệu bất thường." }
        ]
    },
    {
        id: 19,
        situation: <>Bạn bị lừa vay tín dụng đen và không có khả năng chi trả. <strong>Đâu là điều KHÔNG nên làm?</strong></>,
        options: [
            { text: "Vay một app tín dụng đen khác để trả nợ app cũ", feedbackType: 'incorrect', feedbackText: "Chính xác, đây là điều KHÔNG nên làm nhất. Nó sẽ khiến bạn lún sâu hơn vào vòng xoáy nợ nần không lối thoát." },
            { text: "Tìm đến sự giúp đỡ của gia đình, bạn bè thân thiết", feedbackType: 'correct', feedbackText: "Đây là điều nên làm. Đừng im lặng chịu đựng một mình, sự hỗ trợ từ người thân là rất quan trọng." },
            { text: "Trình báo sự việc với cơ quan công an gần nhất", feedbackType: 'correct', feedbackText: "Đây là điều nên làm. Hãy cung cấp tất cả bằng chứng bạn có để pháp luật có thể can thiệp và bảo vệ bạn." }
        ]
    },
    {
        id: 20,
        situation: <>Tổ chức cho vay không có trang web chính thức, không có địa chỉ văn phòng, mọi giao dịch chỉ qua Zalo. <strong>Điều này cho thấy gì?</strong></>,
        options: [
            { text: "Họ là một công ty khởi nghiệp hiện đại, tinh gọn bộ máy", feedbackType: 'incorrect', feedbackText: "Không. Ngay cả công ty hiện đại nhất cũng cần có đăng ký kinh doanh và thông tin pháp lý rõ ràng. Đây là dấu hiệu của một tổ chức bất hợp pháp." },
            { text: "Đây là một tổ chức hoạt động mờ ám, không đáng tin cậy", feedbackType: 'correct', feedbackText: "Đúng. Sự thiếu minh bạch về thông tin pháp nhân là dấu hiệu lớn nhất của tín dụng đen. Bạn sẽ không biết tìm ai khi có tranh chấp." },
            { text: "Họ muốn bảo mật thông tin cho khách hàng", feedbackType: 'neutral', feedbackText: "Sự ẩn danh của bên cho vay không bảo vệ khách hàng, mà chỉ bảo vệ chính họ khỏi sự truy cứu của pháp luật." }
        ]
    }
];


const FinalScenarioScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
    const [feedback, setFeedback] = useState<{ type: FeedbackType, text: string } | null>(null);
    const [answered, setAnswered] = useState(false);

    const loadNewScenario = () => {
        setFeedback(null);
        setAnswered(false);
        const availableScenarios = scenarios.filter(s => s.id !== currentScenario?.id);
        const pool = availableScenarios.length > 0 ? availableScenarios : scenarios;
        const randomIndex = Math.floor(Math.random() * pool.length);
        setCurrentScenario(pool[randomIndex]);
    };
    
    useEffect(() => {
        loadNewScenario();
    }, []);

    const handleChoice = (type: FeedbackType, text: string) => {
        setFeedback({ type, text });
        setAnswered(true);
    };

    if (!currentScenario) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full text-center animate-fade-in">
            <div className="flex justify-center mb-4">
                <ShieldIcon />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Tình huống cuối: Tín dụng đen</h1>
            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                {currentScenario.situation}
            </p>

            <div className="space-y-4 max-w-lg mx-auto">
                {currentScenario.options.map((opt, index) => (
                     <button
                        key={index}
                        onClick={() => handleChoice(opt.feedbackType, opt.feedbackText)}
                        disabled={answered}
                        className="w-full text-left p-4 border-2 border-slate-300 rounded-lg hover:bg-slate-100 hover:border-blue-500 transition-colors disabled:opacity-60 disabled:hover:bg-transparent"
                    >
                        {opt.text}
                    </button>
                ))}
            </div>

            {feedback && (
                <div className={`mt-6 p-4 rounded-lg animate-fade-in-fast ${
                    feedback.type === 'correct' ? 'bg-green-100 border-green-500 text-green-800' :
                    feedback.type === 'incorrect' ? 'bg-red-100 border-red-500 text-red-800' :
                    'bg-yellow-100 border-yellow-500 text-yellow-800'
                } border-l-4`}>
                    <p className="font-semibold">{feedback.text}</p>
                </div>
            )}
            
            {answered && (
                 <button
                    onClick={loadNewScenario}
                    className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Thử tình huống khác
                </button>
            )}

             <button onClick={onBack} className="mt-8 text-blue-600 hover:underline font-semibold block mx-auto">
                &larr; Quay lại Menu
            </button>
        </div>
    );
};

export default FinalScenarioScreen;