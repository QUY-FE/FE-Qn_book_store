const TermsPolicyPage = () => {
  return (
    <div className="max-w-screen-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Điều Khoản & Chính Sách
      </h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            1. Giới thiệu chung
          </h3>
          <p>
            Chào mừng bạn đến với Qn BookStore. Khi bạn truy cập vào trang web
            của chúng tôi, bạn đồng ý với các điều khoản này. Trang web có quyền
            thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Quy
            định và Điều kiện sử dụng này, vào bất cứ lúc nào.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            2. Chính sách bảo mật
          </h3>
          <p className="mb-3">
            Chúng tôi coi trọng việc bảo mật thông tin của khách hàng. Mọi thông
            tin cá nhân của bạn (tên, email, số điện thoại, địa chỉ) sẽ được bảo
            mật và chỉ sử dụng cho mục đích:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Xử lý đơn hàng và giao hàng.</li>
            <li>Thông báo về việc giao hàng và hỗ trợ khách hàng.</li>
            <li>Cung cấp thông tin liên quan đến sản phẩm.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            3. Chính sách đổi trả
          </h3>
          <p>
            Qn BookStore hỗ trợ đổi trả sản phẩm trong vòng{" "}
            <span className="font-bold">7 ngày</span> kể từ ngày nhận hàng nếu
            sản phẩm có lỗi từ nhà sản xuất hoặc hư hỏng trong quá trình vận
            chuyển. Sản phẩm đổi trả phải còn nguyên tem, mác và chưa qua sử
            dụng.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            4. Phương thức thanh toán
          </h3>
          <p>
            Chúng tôi chấp nhận các hình thức thanh toán sau: Thanh toán khi
            nhận hàng (COD), Chuyển khoản ngân hàng, và Ví điện tử (Momo,
            ZaloPay).
          </p>
        </section>

        <div className="text-sm text-gray-500 italic mt-8 text-center">
          Cập nhật lần cuối: 24/11/2025
        </div>
      </div>
    </div>
  );
};

export default TermsPolicyPage;
