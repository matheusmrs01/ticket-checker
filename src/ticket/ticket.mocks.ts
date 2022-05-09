import { TicketResponseDto } from './dtos/ticketResponse.dto';

const correctDigitableLine = '21290001192110001210904475617405975870000002010';

const correctResponseValue = new TicketResponseDto({
  barCode: '21299758700000020100001121100012100447561740',
  amount: '20,10',
  expirationDate: '2018-07-16',
});

const incorrectDigitableLine =
  '21290001192110001210904475617405900000000002010';

const incorrectDigitableLineWithWords =
  '2129000119211000121090447abcd405900000000002010';

export {
  correctDigitableLine,
  correctResponseValue,
  incorrectDigitableLine,
  incorrectDigitableLineWithWords,
};
