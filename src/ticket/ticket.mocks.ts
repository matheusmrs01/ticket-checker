import { TicketResponseDto } from './dtos/ticketResponse.dto';

const correctDigitableLine = '21290001192110001210904475617405975870000002010';

const correctDigitableLineWith48Characters =
  '212900011921100012109044756174059758700000020000';

const correctResponseValue = new TicketResponseDto({
  barCode: '21299758700000020100001121100012100447561740',
  amount: '20,10',
  expirationDate: '2018-07-16',
});

const correctResponseValueForOtherTest = new TicketResponseDto({
  barCode: '21290001192100012109047561740597570000002000',
  amount: '11.921,00',
  expirationDate: null,
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
  correctDigitableLineWith48Characters,
  correctResponseValueForOtherTest,
};
